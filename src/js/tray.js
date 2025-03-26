function setTray() {
    // Tray menu is only available in window mode
    if(NL_MODE != "window") {
        return;
    }

    // Define tray menu items
    let tray = {
        icon: "/src/icons/tray.png",
        menuItems: [
            {id: "ABOUT", text: "About"},
            {id: "SEP", text: "-"},
            {id: "QUIT", text: "Quit"}
        ]
    };

    // Set the tray menu
    Neutralino.os.setTray(tray);
}

// handle tray menu click events
function onTrayMenuItemClicked(event) {
    switch(event.detail.id) {
        case "ABOUT":
            // Display version information
            Neutralino.os.showMessageBox(
                "About",
                [
                    "Ollama Chat\n",
                    "By Geoff Doty \n\n",
                    "Version: 0.0.0"
                ].join(" "));
            break;
        case "QUIT":
            // Exit the application
            Neutralino.app.exit();
            break;
    }
}

/*
    Function to handle the window close event by gracefully exiting the Neutralino application.
*/
function onWindowClose() {
    Neutralino.app.exit();
}

// Initialize Neutralino
Neutralino.init();

// Register event listeners
Neutralino.events.on("trayMenuItemClicked", onTrayMenuItemClicked);
Neutralino.events.on("windowClose", onWindowClose);

// Conditional initialization: Set up system tray if not running on macOS
if(NL_OS != "Darwin") { // TODO: Fix https://github.com/neutralinojs/neutralinojs/issues/615
    setTray();
}
