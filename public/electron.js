const {app, BrowserWindow} = require('electron')
const path = require('path');
const isDev = require('electron-is-dev');

function createWindow() {

    const win = new BrowserWindow({
        width: 1200,
        height: 900,
        minWidth: 1200,
        minHeight: 900,
        maxHeight: 900,
        maxWidth: 1200,
        webPreferences: {
            nodeIntegration: true
        },
        icon: `${__dirname}\\icon.ico`
    });

    win.setMenuBarVisibility(false);

    win.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, "../build/index.html")}`)
    // win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
