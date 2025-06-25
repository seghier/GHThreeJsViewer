# Grasshopper Mesh & UI Viewer

Welcome to the Grasshopper Mesh & UI Viewer! This application allows you to visualize 3D geometry and interact with controls, primarily sourced from Grasshopper, in two distinct ways: a real-time "Direct Connection" or by processing Grasshopper files via "Rhino.Compute".

## Table of Contents

1.  [Prerequisites](#1-prerequisites)
2.  [Getting Started: Launching the Application](#2-getting-started-launching-the-application)
3.  [Understanding the Interface](#3-understanding-the-interface)
    *   [Left Panel & Tabs](#left-panel--tabs)
    *   [Controls Panel](#controls-panel)
4.  [Operating Modes](#4-operating-modes)
    *   [A. Direct Connection Mode](#a-direct-connection-mode-real-time-from-grasshopper)
    *   [B. Rhino.Compute Mode](#b-rhinocompute-mode-processing-gh-files)
5.  [Key Panel Features](#5-key-panel-features)
    *   [Info & Connection Panel](#info--connection-panel-info-tab)
    *   [Paths & Servers Panel](#paths--servers-panel-folder-tab)
    *   [Scene & Lighting Panel](#scene--lighting-panel-wb_incandescent-tab)
    *   [Camera Controls Panel](#camera-controls-panel-photo_camera-tab)
    *   [Sun Path Simulation Panel](#sun-path-simulation-panel-clear_day-tab)
    *   [Object Inspector Panel](#object-inspector-panel-ev_shadow-tab)
6.  [Troubleshooting & Tips](#6-troubleshooting--tips)

---

## 1. Prerequisites

*   **Python 3:** Required to run the local Flask server. Ensure it's added to your system PATH.
*   **Flask & Flask-CORS:** Python libraries. The `setup_venv.bat` script handles their installation.
*   **(For Direct Connection Mode):**
    *   Rhino and Grasshopper installed.
    *   A Grasshopper definition configured to stream data via WebSockets (e.g., using a custom component that sends data in the expected Flatbuffers format to `ws://localhost:8081`).
*   **(For Rhino.Compute Mode):**
    *   A Grasshopper file (`.gh` or `.ghx`) you want to process.
    *   Access to a Rhino.Compute server:
        *   **Option 1: Standalone `rhino.compute.exe`:** Download from [McNeel's compute.rhino3d GitHub](https://github.com/mcneel/compute.rhino3d/releases). This typically runs on `http://localhost:5000`.
        *   **Option 2: Rhino 7/8 Built-in Compute:** Rhino 7 and 8 can run a compute server internally, usually on `http://localhost:6500`.

---

## 2. Getting Started: Launching the Application

1.  **Clone or Download the Repository:** Get all project files (`server.py`, `index.html`, `setup_venv.bat`, `start_server.bat`, etc.).
2.  **Ensure Python 3 is Installed:** Verify Python is installed and accessible from your command line/terminal.
3.  **First-Time Setup (Windows):**
    *   Navigate to the project directory in your terminal or File Explorer.
    *   Double-click `setup_venv.bat`. This will:
        *   Create a Python virtual environment in a folder named `venv`.
        *   Install required packages (Flask, Flask-CORS) into this environment.
    *   You only need to do this once, or if you delete the `venv` folder.
4.  **Run the Server (Windows):**
    *   Double-click `start_server.bat`. This will:
        *   Activate the `venv` virtual environment.
        *   Start the Flask web server (usually on `http://localhost:8000`).
        *   Automatically open the application in your default web browser.
    *   The Flask server is crucial for serving the `index.html`, supporting scripts, and handling API requests (like listing local HDRs or starting `rhino.compute.exe`).
    *   To stop the server, press `Ctrl+C` in the terminal window where `start_server.bat` is running.

---

## 3. Understanding the Interface

The application interface is divided into a main 3D viewer area and control panels.

*   **Viewer:** The central area where your 3D geometry is displayed.
*   **Left Panel Wrapper:**
    *   Located on the left side, containing tabs to access different settings and information.
    *   Can be collapsed/expanded using the `chevron_left` / `chevron_right` button at the bottom of the tabs.
    *   **Tabs (identified by icons):**
        *   `info`: Info & Connection (Mode selection, status, scene management)
        *   `folder`: Paths & Servers (Manage local server executables)
        *   `wb_incandescent`: Scene & Lighting (Environment, lights, visibility)
        *   `photo_camera`: Camera Controls
        *   `clear_day`: Sun Path Simulation
        *   `ev_shadow`: Object Inspector (Appears when objects are loaded)
*   **Controls Panel ("Grasshopper Controls"):**
    *   Located on the right side.
    *   This panel is **dynamically populated** with sliders, toggles, and buttons defined in your Grasshopper script (either via Direct Connection or Rhino.Compute).
    *   It will only appear if the Grasshopper definition provides controllable inputs.
    *   Can be collapsed/expanded by clicking its title bar.

---

## 4. Operating Modes

You select the operating mode from the **Info & Connection** panel (the `info` tab).

### A. Direct Connection Mode (Real-time from Grasshopper)

This mode is for real-time visualization of a Grasshopper definition that is actively running and streaming data.

1.  **In Grasshopper:**
    *   Open your Grasshopper definition.
    *   Ensure the component responsible for streaming mesh and control data via WebSockets is active and sending data to the correct URL (default is `ws://localhost:8081`).
2.  **In the Web App:**
    *   Navigate to the **Info & Connection** panel.
    *   The "Direct Connection" mode should be selected by default.
    *   The `wsUrl` field will show `ws://localhost:8081`. Change this if your Grasshopper streamer uses a different address or port.
    *   Click the **"Connect"** button.
    *   **Status:** The status indicator should change from "Disconnected" to "Connecting..." and then "Connected".
    *   **Viewer:** You should see meshes from Grasshopper appear.
    *   **Controls Panel:** If your Grasshopper script exposes controls (sliders, toggles), they will appear in the "Grasshopper Controls" panel on the right. Interacting with these controls in the web app will send messages back to your Grasshopper script.
    *   Changes made in Grasshopper (e.g., moving a slider, changing geometry) should update in the web viewer in near real-time.
    *   Click **"Disconnect"** to stop the connection.

### B. Rhino.Compute Mode (Processing GH files)

This mode allows you to upload a Grasshopper file (`.gh` or `.ghx`). The file is sent to a Rhino.Compute server for processing, and the results (geometry and input parameters) are displayed.

**Step 1: Ensure a Rhino.Compute Server is Running**

You have two main options:

*   **Option 1: Using Standalone `rhino.compute.exe` (Recommended for local development)**
    1.  Download `compute.rhino3d` from the [McNeel GitHub Releases](https://github.com/mcneel/compute.rhino3d/releases) (get the version matching your Rhino, e.g., `compute.rhino3d-8.x.x.zip`).
    2.  Extract it. You'll find `rhino.compute.exe`.
    3.  **Starting it:**
        *   **Manually:** You can double-click `rhino.compute.exe`. A console window will appear, and it will typically listen on `http://localhost:5000`.
        *   **Via the Web App:**
            *   Go to the **Paths & Servers** panel (`folder` tab).
            *   In the "Rhino.Compute Path" input, browse to or paste the full path to your `rhino.compute.exe` (e.g., `C:\path\to\compute.rhino3d-8.x.x\rhino.compute.exe`). This path is saved in your browser's local storage.
            *   Click **"Start Compute"**. The Flask server (running on port 8000) will attempt to launch `rhino.compute.exe`. Status messages will appear below the button.
            *   *Note:* This starts the server on its default port, usually `http://localhost:5000`.

*   **Option 2: Using Rhino 7/8's Built-in Compute Server**
    1.  Open Rhino 7 or 8.
    2.  Type `GrasshopperDeveloperSettings` in the Rhino command line.
    3.  Enable the "Compute Service" option.
    4.  This server typically runs on `http://localhost:6500`.
    5.  You *do not* use the "Start Compute" button in the web app for this method; Rhino manages this server itself.

**Step 2: Using Rhino.Compute Mode in the Web App**

1.  Go to the **Info & Connection** panel.
2.  Click the **"Rhino.Compute"** button to switch to this mode.
3.  **Rhino.Compute Server URL:**
    *   Enter the URL of your running Rhino.Compute server.
        *   If using standalone `rhino.compute.exe` (started manually or via app): `http://localhost:5000` (default)
        *   If using Rhino 7/8's built-in compute: `http://localhost:6500` (default)
4.  **Select GH File:**
    *   Click the "Choose File" button next to `ghFileInput`.
    *   Select your `.gh` or `.ghx` Grasshopper definition.
5.  **Load Definition:**
    *   Click **"Load GH Definition"**.
    *   **Status:** The status will indicate "Loading GH definition..." and then "RC Mode Active" if successful.
    *   **Controls Panel:** The input parameters (sliders, toggles, etc.) from your Grasshopper file will populate the "Grasshopper Controls" panel on the right.
    *   **Viewer:** The geometry output by the Grasshopper definition (using default input values) will be displayed.
6.  **Interact:**
    *   Modify the controls in the "Grasshopper Controls" panel. Each change will send a new request to the Rhino.Compute server, and the viewer will update with the new geometry.
7.  **Reset Mode:**
    *   If you want to load a different GH file or switch back to Direct Connection, click the **"Reset Mode"** button. This will clear the current Rhino.Compute state and re-enable the "Direct Connection" button.

---

## 5. Key Panel Features

### Info & Connection Panel (`info` tab)

*   **Mode Selection:** Buttons for "Direct Connection" and "Rhino.Compute" (covered above).
*   **Connection Details:**
    *   Direct Mode: `wsUrl` input and Connect/Disconnect button.
    *   RC Mode: `rhinoComputeUrl` input, `ghFileInput`, Load GH Definition, and Reset Mode buttons.
*   **Status:** Shows current connection state, mesh count, control count, and data size (for Direct Mode).
*   **Scene State:**
    *   `SceneFileName`: Enter a prefix for saved scene files.
    *   `Save JSON`: Saves the current scene settings (lighting, camera, material presets, panel values) to a `.json` file.
    *   `Load JSON`: Loads a previously saved `.json` scene settings file.
    *   `Export GLB`: Exports the current 3D geometry from the scene as a `.glb` file (a binary GLTF format).

### Paths & Servers Panel (`folder` tab)

*   **Rhino.Compute Path:**
    *   Input field to specify the full path to your standalone `rhino.compute.exe`.
    *   `Start Compute` button: Attempts to launch the `rhino.compute.exe` specified in the path. This is handled by the Flask backend.
    *   `compute-status`: Displays messages about the server starting process.

### Scene & Lighting Panel (`wb_incandescent` tab)

*   **Environment (HDR):**
    *   `Local Environment`: If the Flask server finds HDR files in an `hdrs` subfolder next to `server.py`, they will be listed here. Selecting one loads it.
    *   `Online Environment`: A dropdown of HDRIs hosted on PolyHaven.
        *   `default.hdr`: This special option will attempt to load an HDR named `default.hdr` from your local `hdrs` folder first (if available and listed under "Local Environment" as "Default Local Hdr"). If not found locally, it will try to load a pre-defined PolyHaven HDR.
    *   Selecting an HDR sets the scene's background and reflections.
*   **Background Intensity:** Slider to control the brightness of the HDR environment map.
*   **Scene Exposure:** Slider to control the overall exposure/brightness of the rendered scene.
*   **Lighting Mode:**
    *   `Sun`: Uses a directional light simulating the sun. Sun position can be controlled manually or via Sun Path simulation.
    *   `Default`: Uses two simple directional lights. Intensity can be adjusted.
    *   `Custom`: Uses a configurable spotlight and a fill light.
        *   **Custom Spotlight Position:** X, Y, Z coordinates for the main spotlight.
        *   **Light & Shadow Properties:** Color, Intensity, Angle (beam spread), Softness (penumbra) of the spotlight, and Shadow Darkness (affects ambient light contribution).
*   **Sun Controls (visible if "Sun" lighting mode is active):**
    *   `Manual Sun Position`: Sliders for Altitude and Azimuth. Disabled if Sun Path simulation is active.
*   **Scene Visibility:**
    *   `Shadows`: Toggle all shadows on/off.
    *   `Ground`: Toggle a visible ground plane on/off. If off, but shadows are on, a shadow-catcher ground is used.
    *   `Grid`: Toggle a 2D grid helper on the ground.
    *   `Show Light Helper`: (For "Custom" lighting mode) Toggles a visual aid for the spotlight.

### Camera Controls Panel (`photo_camera` tab)

*   **Orthographic Toggle:** Switches camera between Perspective and Orthographic-like (achieved via extreme dolly zoom).
*   **Dolly Zoom:** Slider to smoothly transition field-of-view while keeping the subject framed (simulates a dolly zoom effect). Shows current FOV.
*   **Camera Position:** X, Y, Z inputs for direct camera position.
*   **Camera Target:** X, Y, Z inputs for the point the camera looks at.
*   **Zoom Extents:** Button to automatically frame all visible objects in the scene.

### Sun Path Simulation Panel (`clear_day` tab)

*   **Show Diagram:** Toggles the visibility of the sun path diagram in the 3D view.
*   **Location & Date:**
    *   `Latitude`/`Longitude`: Sliders and number inputs for geographic location.
    *   `DateInput`: Select the date for the simulation.
*   **Time of Day:** Slider to set the time.
*   When active and "Sun" lighting mode is selected, this panel drives the sun's position.

### Object Inspector Panel (`ev_shadow` tab)

This panel appears when there are selectable objects in the scene.

*   **Selected Object:** Dropdown to choose an object from the scene.
*   **Highlight Selection / Enable Click-to-Select:** Toggle switch.
    *   When ON and this panel is active: The selected object in the dropdown will be highlighted with an outline. You can also click on objects in the 3D viewer to select them.
    *   When OFF, or this panel is not active: No outline, and click-to-select is disabled.
*   **Inspector Details (for the selected object):**
    *   `Visible`: Toggle object visibility.
    *   `Two-Sided`: Toggle two-sided rendering for the object's material.
    *   **Information:** Vertices, Faces, calculated Volume.
    *   **Material Preset:** Apply pre-defined PBR material settings (Standard, Glass, Polished Metal, etc., including a "Shadow Catcher" for the ground).
    *   **Material Controls (if editable material):**
        *   `Core Properties`: Color picker, Roughness, Metalness sliders.
        *   `Physical & Reflection` (for PBR Physical Materials): Opacity, Env Power, Transmit (transmission), IOR (Index of Refraction), Thickness.
        *   `Iridescence (Fire)`: Amount, IOR, Range.
        *   `Coat Properties (Varnish)`: Coat amount, Coat Roughness.

---

## 6. Troubleshooting & Tips

*   **Flask Server Not Starting:**
    *   Ensure Python is in your PATH.
    *   Make sure you ran `setup_venv.bat` successfully to install dependencies.
    *   Check the console output of `start_server.bat` for error messages. Port 8000 might be in use by another application.
*   **Direct Connection Not Working:**
    *   Verify your Grasshopper script is running and its WebSocket streamer is active.
    *   Check the WebSocket URL (`wsUrl`) in the app matches the one in Grasshopper.
    *   Look at your browser's developer console (usually F12) for WebSocket connection errors.
*   **Rhino.Compute Mode Not Working:**
    *   **"Failed to start server" (when using "Start Compute" button):**
        *   Ensure the "Rhino.Compute Path" in the "Paths & Servers" panel is correct and points to a valid `rhino.compute.exe`.
        *   The Flask server might not have permission to launch executables, or there might be an issue with the `rhino.compute.exe` itself (e.g., missing dependencies for Rhino). Check the console output of `rhino.compute.exe` if it attempts to start.
    *   **"Error loading GH file" / "Compute Error":**
        *   Ensure your Rhino.Compute server (standalone or in-Rhino) is actually running and accessible at the specified `rhinoComputeUrl`.
        *   The Grasshopper file might have errors, missing plugins, or use components not supported by Rhino.Compute.
        *   If using the standalone `rhino.compute.exe`, make sure it has access to any Rhino plugins your GH file might need.
        *   Check the console output of your Rhino.Compute server for more detailed error messages.
*   **No HDRs in "Local Environment":**
    *   Make sure you have an `hdrs` folder in the same directory as `server.py`.
    *   Place `.hdr` files directly into this `hdrs` folder.
    *   The Flask server (`server.py`) must be running to list these files.
*   **Performance:** Complex Grasshopper definitions or very high-poly meshes can impact performance, especially in Rhino.Compute mode due to data transfer and server processing time.
*   **Saving Paths:** The path to `rhino.compute.exe` is saved in your browser's local storage so you don't have to enter it every time.
*   **Saving Scene States:** The "Save JSON" feature is great for quickly restoring complex lighting and material setups.
