"""Frontend server for Open Deep Research.

This module provides a FastAPI server that serves the React frontend
and proxies requests to the LangGraph backend API.
"""

import os
from pathlib import Path
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# Get the frontend build directory
FRONTEND_DIR = Path(__file__).parent.parent / "frontend"
FRONTEND_BUILD_DIR = FRONTEND_DIR / "dist"

app = FastAPI(
    title="Open Deep Research",
    description="AI-Powered Deep Research Agent with Web Interface",
    version="1.0.0",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify actual origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "service": "Open Deep Research Frontend"}


# Serve static files from the React build
if FRONTEND_BUILD_DIR.exists():
    app.mount(
        "/assets",
        StaticFiles(directory=FRONTEND_BUILD_DIR / "assets"),
        name="assets",
    )

    @app.get("/{full_path:path}")
    async def serve_frontend(full_path: str):
        """Serve the React frontend for all routes."""
        # Check if it's a file request
        file_path = FRONTEND_BUILD_DIR / full_path
        if file_path.is_file():
            return FileResponse(file_path)
        
        # Otherwise, serve index.html (SPA routing)
        index_path = FRONTEND_BUILD_DIR / "index.html"
        if index_path.exists():
            return FileResponse(index_path)
        
        raise HTTPException(status_code=404, detail="Frontend not built")
else:
    @app.get("/")
    async def frontend_not_built():
        """Inform that frontend needs to be built."""
        return {
            "error": "Frontend not built",
            "message": "Please build the frontend first by running: cd frontend && npm install && npm run build",
            "frontend_dir": str(FRONTEND_DIR),
            "build_dir": str(FRONTEND_BUILD_DIR),
        }


def main():
    """Run the frontend server."""
    # Check if frontend is built
    if not FRONTEND_BUILD_DIR.exists():
        print("⚠️  Frontend not built!")
        print("📦 Please build the frontend first:")
        print("   cd frontend")
        print("   npm install")
        print("   npm run build")
        print()
        print("Starting server anyway (will show build instructions)...")
        print()
    
    # Get port from environment or use default
    port = int(os.getenv("FRONTEND_PORT", "8000"))
    
    print(f"🚀 Starting Open Deep Research Frontend Server on port {port}")
    print(f"📁 Frontend directory: {FRONTEND_DIR}")
    print(f"📁 Build directory: {FRONTEND_BUILD_DIR}")
    print(f"🌐 Access the application at: http://localhost:{port}")
    print()
    print("Note: Make sure the LangGraph backend is running on port 2024")
    print("      Start it with: uvx --from 'langgraph-cli[inmem]' --with-editable . --python 3.11 langgraph dev --allow-blocking")
    print()
    
    uvicorn.run(app, host="0.0.0.0", port=port, log_level="info")


if __name__ == "__main__":
    main()
