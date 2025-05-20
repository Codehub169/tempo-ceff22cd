#!/bin/bash

# Simple Expense Tracker Startup Script
# This script helps in launching the client-side application.

echo "🚀 Starting Simple Expense Tracker..."
echo "-----------------------------------------"

# Check for Python 3 to serve the files
if command -v python3 &> /dev/null;
then
  _PYTHON_CMD="python3"
elif command -v python &> /dev/null;
then
  _PYTHON_CMD="python"
else
  _PYTHON_CMD=""
fi

if [ -n "$_PYTHON_CMD" ]; then
  # Python is available, try to start a simple HTTP server.
  echo "🐍 Python found. Attempting to start a local HTTP server."
  echo "   If successful, open your web browser and go to:"
  echo "   http://localhost:8000 (or the port shown below if 8000 is in use)"
  echo ""
  echo "   Press Ctrl+C to stop the server when you're done."
  echo "-----------------------------------------"
  
  # Attempt to start the server. Handles both Python 3 and Python 2 module names.
  if [[ "$_PYTHON_CMD" == "python3" ]]; then
    $_PYTHON_CMD -m http.server
  else
    # Try Python 2's SimpleHTTPServer if 'python -m http.server' fails (e.g. older Python 2)
    $_PYTHON_CMD -m http.server || $_PYTHON_CMD -m SimpleHTTPServer
  fi
  
  # Fallback message if server exits immediately or fails silently
  echo "-----------------------------------------"
  echo "🛑 Server stopped or failed to start."
  echo "   If the server didn't start, you can still open the 'index.html' file directly in your browser."
else
  # Python is not available.
  echo "🤔 Python not found on your system."
  echo "   To run this application, please open the 'index.html' file directly in your web browser."
  echo "   Navigate to the project directory and double-click 'index.html'."
  echo ""
  echo "   For a better experience, consider serving the files using any local web server."
  echo "   If you have Node.js, you can use 'npx serve' in this directory."
fi

echo "-----------------------------------------"
echo "👋 Thank you for using Simple Expense Tracker!"
