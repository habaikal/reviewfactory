#!/usr/bin/env python3
import argparse, os, subprocess, requests
def run(cmd): print(f"$ {cmd}"); subprocess.run(cmd, shell=True)
parser=argparse.ArgumentParser(); parser.add_argument("--username", required=True); parser.add_argument("--repo", default="reviewfactory-os-v2"); parser.add_argument("--token", default=os.getenv("GITHUB_TOKEN")); args=parser.parse_args()
if not args.token: print("Need GITHUB_TOKEN"); exit(1)
# create repo via API
import json
r=requests.post("https://api.github.com/user/repos", headers={"Authorization": f"token {args.token}"}, json={"name": args.repo, "private": False})
print(r.status_code, r.text[:200])
run("git init; git branch -M main")
run("git add ."); run('git commit -m "feat: v2.0"')
run("git remote remove origin || true")
run(f"git remote add origin https://{args.token}@github.com/{args.username}/{args.repo}.git")
run("git push -u origin main --force")
