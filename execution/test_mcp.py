import json
import subprocess
import os

def run_mcp_session():
    env = os.environ.copy()
    env["SUPABASE_URL"] = "https://szsnzqpcgcuaisefvrog.supabase.co"
    env["SUPABASE_KEY"] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6c256cXBjZ2N1YWlzZWZ2cm9nIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDY4MzcyMCwiZXhwIjoyMDg2MjU5NzIwfQ.b32Iyo4Lpn5T_kgg2ZrDCaKZeoQS3-92Rtn9qXuWWNA"
    env["SUPABASE_ACCESS_TOKEN"] = env["SUPABASE_KEY"]

    process = subprocess.Popen(
        ["npx", "-y", "mcp-supabase"],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        env=env
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

    # Try invoke_function with name 'sql'
    sql = """
    CREATE TABLE IF NOT EXISTS missions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        description TEXT,
        objectives JSONB,
        steps JSONB,
        outcome TEXT,
        questions JSONB,
        priority TEXT,
        status TEXT DEFAULT 'pending',
        category TEXT,
        project TEXT,
        resp TEXT,
        created_at TIMESTAMPTZ DEFAULT now()
    );
    """
    
    res = send_request({
        "jsonrpc": "2.0",
        "id": 3,
        "method": "tools/call",
        "params": {
            "name": "invoke_function",
            "arguments": {
                "function": "sql",
                "params": {"query": sql}
            }
        }
    })
    print("Invoke Response:", json.dumps(res, indent=2))

    process.terminate()

if __name__ == "__main__":
    run_mcp_session()
