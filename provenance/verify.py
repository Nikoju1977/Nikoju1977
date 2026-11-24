#!/usr/bin/env python3
"""Studio Niko Design — verify the pinned public provenance snapshot."""
import argparse
import concurrent.futures
import hashlib
import json
import re
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent
REGISTRY = ROOT / "registry-2026-11-24.json"
EXPECTED = "d9f86b6a6120fc6deefa68e8705ae9f602872c457e75ad6e8c502258ee9d8034"
RAW = "https://raw.githubusercontent.com/"
FILENAME = "STUDIO-NIKO-METADATA.json"

def load_registry(raw):
    digest = hashlib.sha256(raw).hexdigest()
    if digest != EXPECTED:
        raise ValueError("Registry SHA-256 differs from the pinned reference")
    obj = json.loads(raw)
    if obj.get("schema") != "studio-niko-design.registry/v1":
        raise ValueError("Unexpected registry schema")
    rows = obj["repositories"]
    if len(rows) != 51:
        raise ValueError("Unexpected repository count")
    seen = set()
    for row in rows:
        repo, sha = row["repository"], row["metadata_commit"]
        if not re.fullmatch(r"Nikoju1977/[A-Za-z0-9_.-]+", repo):
            raise ValueError("Unexpected repository")
        if repo.lower() in seen or repo.lower() == "nikoju1977/wan2gp":
            raise ValueError("Duplicate or excluded repository")
        if not re.fullmatch(r"[a-f0-9]{40}", sha):
            raise ValueError("Invalid commit")
        seen.add(repo.lower())
    return rows

def fetch(repo, ref):
    url = RAW + repo + "/" + ref + "/" + FILENAME
    req = urllib.request.Request(url, headers={"User-Agent": "Studio-Niko-Provenance/1.0"})
    with urllib.request.urlopen(req, timeout=20) as response:
        data = response.read(131073)
    if len(data) > 131072:
        raise ValueError("Metadata too large")
    return data

def compare(repo, original, current):
    meta = json.loads(original)
    if (meta.get("schema") != "studio-niko-design.provenance/v1"
            or meta.get("publisher") != "Studio Niko Design"
            or meta.get("repository") != "https://github.com/" + repo):
        return "REFERENCE_INVALID"
    return "MATCH" if current == original else "CHANGED_REVIEW"

def check(row):
    repo = row["repository"]
    try:
        original = fetch(repo, row["metadata_commit"])
        current = fetch(repo, "main")
        return repo, compare(repo, original, current)
    except Exception as exc:
        return repo, "UNVERIFIED: " + str(exc)

def self_test():
    repo = "Nikoju1977/example"
    raw = json.dumps({"schema": "studio-niko-design.provenance/v1",
                      "publisher": "Studio Niko Design",
                      "repository": "https://github.com/" + repo}).encode()
    if compare(repo, raw, raw) != "MATCH":
        raise RuntimeError("Match test failed")
    if compare(repo, raw, raw + b" ") != "CHANGED_REVIEW":
        raise RuntimeError("Change test failed")
    if compare(repo, b"{}", raw) != "REFERENCE_INVALID":
        raise RuntimeError("Reference test failed")
    try:
        load_registry(b"tampered")
    except ValueError:
        pass
    else:
        raise RuntimeError("Tampering test failed")
    print("Self-tests passed")

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--online", action="store_true", help="Compare historical and live public metadata")
    parser.add_argument("--self-test", action="store_true", help="Run local verification tests")
    args = parser.parse_args()
    if args.self_test:
        self_test()
    try:
        rows = load_registry(REGISTRY.read_bytes())
        checksum = REGISTRY.with_suffix(".sha256").read_text(encoding="ascii").strip()
        if checksum != EXPECTED + "  " + REGISTRY.name:
            raise ValueError("Checksum sidecar differs from reference")
    except (OSError, ValueError, KeyError, TypeError) as exc:
        print("REGISTRY ERROR:", exc, file=sys.stderr)
        return 1
    print("REGISTRY OK:", len(rows), "repositories;", EXPECTED)
    if not args.online:
        print("Offline check only; live metadata not checked.")
        return 0
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
        results = list(pool.map(check, rows))
    for repo, status in results:
        print(status, repo)
    count = sum(status == "MATCH" for _, status in results)
    print(f"{count}/{len(rows)} metadata files match the snapshot.")
    print("Changes require review; a match is not a proof of ownership or an independent timestamp.")
    return 0 if count == len(rows) else 2

if __name__ == "__main__":
    sys.exit(main())
