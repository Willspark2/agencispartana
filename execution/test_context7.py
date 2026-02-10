import json
import subprocess
import os

def run_mcp_session():
    process = subprocess.Popen(
        ["npx", "-y", "context7-mcp-server"],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True
    )

    def send_request(req):
        process.stdin.write(json.dumps(req) + "\n")
        process.stdin.flush()
        line = process.stdout.readline()
        return json.loads(line) if line else None

    send_request({
        "jsonrpc": "2.0",
        "id": 1,
        "method": "initialize",
        "params": {
            "protocolVersion": "2024-11-05",
            "capabilities": {},
            "clientInfo": {"name": "test-client", "version": "1.0.0"}
        }
    })

    res = send_request({
        "jsonrpc": "2.0",
        "id": 2,
        "method": "tools/list",
        "params": {}
    })
    print("Context7 Tools:", json.dumps(res, indent=2))

    process.terminate()

if __name__ == "__main__":
    run_mcp_session()
