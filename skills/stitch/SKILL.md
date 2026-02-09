# Stitch MCP (Stitch)

Interface with Google Stitch (Design with AI) via MCP.

## Configuration
Requires a Stitch API Key from https://stitch.withgoogle.com/settings.

## Usage
Run `mcporter call https://stitch.googleapis.com/mcp --header X-Goog-Api-Key:YOUR_API_KEY <tool_name> [args...]`

### Available Tools
- `create_project`: Create a new UI project
- `list_projects`: List all active designs
- `generate_screen_from_text`: Create design from text prompt
- `get_project`: Get project details
- `list_screens`: List screens in a project
- `get_screen`: Get screen details
