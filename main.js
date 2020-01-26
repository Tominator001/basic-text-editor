const { app, BrowserWindow, Menu } = require('electron');

function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

    win.webContents.on("did-finish-load", () => {
        win.webContents.executeJavaScript(`openWorkspace();`); // <--- this does not execute with electron-3.0.0-beta.1
    });

  // and load the index.html of the app.
  win.loadFile('index.html')

  const template = [
    {
        label: 'File',
        submenu: [
            { 
                label: "Open",
                click(){
                    win.webContents.executeJavaScript('open()');
                },

                accelerator: "CmdOrCtrl+O"
             },
            { 
                label: "Save",
                click(){
                    win.webContents.executeJavaScript('save()');
                },

                accelerator: "CmdOrCtrl+S"
            },
            { role: "Close" }
        ]
      
    },
    {
        label: 'Debug',
        submenu: [
            {
                label: "Dev Tools",
                click(){
                    win.webContents.toggleDevTools();
                },
                accelerator: "F12"
            }
        ]
    }
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow()
    }
})
  