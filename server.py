# --- START OF MODIFIED FILE server.py ---

import os
import subprocess
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import webbrowser
import threading

# --- Configuration ---
STATIC_DIR = '.' 
HDRS_SUBDIR = 'hdrs'
BACKPLATES_SUBDIR = 'backplates' # <-- ADDED THIS LINE

# --- Flask App Setup ---
app = Flask(__name__)
# Enable Cross-Origin Resource Sharing for the app
CORS(app)

# Dictionary to keep track of running server processes
running_processes = {}

# --- API Endpoint to List HDRs ---
@app.route('/api/list-hdrs')
def list_hdrs():
    """
    Scans the 'hdrs' directory and returns a JSON list of the files found.
    """
    hdr_directory_path = os.path.join(STATIC_DIR, HDRS_SUBDIR)
    
    try:
        hdr_files = [f for f in os.listdir(hdr_directory_path) if f.lower().endswith('.hdr')]
        
        file_list = []
        for filename in sorted(hdr_files):
            pretty_name = os.path.splitext(filename)[0].replace('_', ' ').replace('-', ' ').title()
            browser_path = os.path.join(HDRS_SUBDIR, filename).replace('\\', '/')
            
            file_list.append({
                "name": pretty_name,
                "path": browser_path
            })
            
        return jsonify(file_list)
        
    except FileNotFoundError:
        return jsonify([])

# --- ADD THIS ENTIRE SECTION ---
# --- API Endpoint to List Backplates ---
@app.route('/api/list-backplates')
def list_backplates():
    """
    Scans the 'backplates' directory and returns a JSON list of image files.
    """
    backplate_directory_path = os.path.join(STATIC_DIR, BACKPLATES_SUBDIR)
    
    try:
        # Define which image file types are supported
        supported_extensions = ('.png', '.jpg', '.jpeg', '.webp')
        image_files = [f for f in os.listdir(backplate_directory_path) if f.lower().endswith(supported_extensions)]
        
        file_list = []
        for filename in sorted(image_files):
            # Create a user-friendly name from the filename
            pretty_name = os.path.splitext(filename)[0].replace('_', ' ').replace('-', ' ').title()
            # This is the URL path the browser will use to request the image
            browser_path = os.path.join(BACKPLATES_SUBDIR, filename).replace('\\', '/')
            
            file_list.append({
                "name": pretty_name,
                "path": browser_path
            })
            
        return jsonify(file_list)
        
    except FileNotFoundError:
        # If the backplates directory doesn't exist, return an empty list.
        # This is not an error, it just means there are no backplates to show.
        return jsonify([])
# --- END OF ADDED SECTION ---


# --- ADDED: API Endpoint to Start Local Servers ---
@app.route('/api/start-server', methods=['POST'])
def start_server():
    """
    Receives a request to start a local executable (like rhino.compute.exe).
    This is necessary because a browser cannot start programs on the user's computer directly.
    """
    data = request.get_json()
    server_name = data.get('server')
    path = data.get('path')

    if not server_name or not path:
        return jsonify({'message': 'Missing server name or path.'}), 400

    if not os.path.exists(path):
        return jsonify({'message': f'Path not found: {path}'}), 404

    # Check if process is already running and is still alive
    if server_name in running_processes and running_processes[server_name].poll() is None:
        print(f"{server_name.capitalize()} server is already running.")
        return jsonify({'message': f'{server_name.capitalize()} server is already running.'}), 200

    try:
        # For executables, it's often better to start them in their own directory
        working_directory = os.path.dirname(path)
        
        # Use Popen for a non-blocking call to start the process
        process = subprocess.Popen([path], cwd=working_directory, creationflags=subprocess.CREATE_NEW_CONSOLE)
        
        running_processes[server_name] = process
        print(f"Started {server_name} server with PID: {process.pid}")
        return jsonify({'message': f'{server_name.capitalize()} server started successfully.'}), 200
    except Exception as e:
        print(f"Error starting {server_name} server: {e}")
        return jsonify({'message': f'Failed to start server: {e}'}), 500

# --- Route for Serving the Main Page and Static Files ---
@app.route('/')
def serve_index():
    """Serves the main index.html file."""
    return send_from_directory(STATIC_DIR, 'index.html')

@app.route('/<path:path>')
def serve_static_files(path):
    """
    This is a catch-all route. It serves any other file requested by the browser,
    like your .js files, or the .hdr files themselves from the 'hdrs' folder.
    
    IMPORTANT: This route will also automatically serve the images from your 'backplates'
    folder, so you do not need to add another route for them.
    """
    return send_from_directory(STATIC_DIR, path)


# --- Main execution block ---
if __name__ == '__main__':
    print("Flask server running.")
    print(f"Open http://localhost:8000 in your browser.")
    
    # Optional: Auto-open browser
    def open_browser():
        webbrowser.open_new("http://localhost:8000/")
    threading.Timer(1, open_browser).start() # Open after 1 second
    
    # Run on port 8000 to keep it separate from the other servers
    app.run(host='0.0.0.0', port=8000, debug=False)

# --- END OF MODIFIED FILE server.py ---