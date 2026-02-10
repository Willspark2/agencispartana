import sys
import os
import json
from datetime import datetime

def run_brainstorm(theme, input_file):
    try:
        if not os.path.exists(input_file):
            print(f"Error: Brainstorm file {input_file} not found.")
            sys.exit(1)
            
        with open(input_file, 'r') as f:
            content = f.read()
            
        # Simulating a check of the last contributor to rotate agents
        # In orchestration, Erika will call this script after each agent turn
        print(f"Brainstorm '{theme}' updated at {datetime.now()}")
        return True
    except Exception as e:
        print(f"Execution Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python brainstorm_orchestrator.py <theme> <file_path>")
        sys.exit(1)
    run_brainstorm(sys.argv[1], sys.argv[2])
