#!/usr/bin/env python3
"""
Setup script for Friday AI Assistant
This script helps set up all the required dependencies and models.
"""

import subprocess
import sys
import os

def run_command(command, description):
    """Run a command and handle errors"""
    print(f"\n🔧 {description}...")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ {description} completed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Error during {description}:")
        print(f"Command: {command}")
        print(f"Error: {e.stderr}")
        return False

def main():
    print("🚀 Setting up Friday AI Assistant...")
    
    # Check if Python is available
    python_version = sys.version_info
    if python_version.major < 3 or (python_version.major == 3 and python_version.minor < 8):
        print("❌ Python 3.8 or higher is required")
        return False
    
    print(f"✅ Python {python_version.major}.{python_version.minor} detected")
    
    # Install Python dependencies
    if not run_command("pip install -r requirements.txt", "Installing Python dependencies"):
        return False
    
    # Check if Ollama is installed
    print("\n🔍 Checking for Ollama...")
    try:
        subprocess.run(["ollama", "--version"], check=True, capture_output=True)
        print("✅ Ollama is installed")
    except (subprocess.CalledProcessError, FileNotFoundError):
        print("❌ Ollama is not installed")
        print("Please install Ollama from: https://ollama.ai/")
        print("Then run: ollama pull llama3")
        return False
    
    # Pull the required model
    if not run_command("ollama pull llama3", "Downloading Llama3 model (this may take a while)"):
        print("⚠️  Model download failed, but you can try running the server anyway")
    
    # Create necessary directories
    os.makedirs("audio_temp", exist_ok=True)
    print("✅ Created audio_temp directory")
    
    print("\n🎉 Setup completed!")
    print("\n📋 To start the server:")
    print("   uvicorn main:app --reload --host 0.0.0.0 --port 8000")
    print("\n📋 To start the React frontend:")
    print("   npm run dev")
    
    return True

if __name__ == "__main__":
    success = main()
    if not success:
        sys.exit(1)