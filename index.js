const {app, BrowserWindow, Tray, ipcMain} = require('electron');

function CreateWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: "icon.ico",
        resizable: false,
        webgl: true,
        titleBarStyle: 'default',
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: true,
            preload: "preload.js"
        }
    });

    win.loadFile("index.html");

    ipcMain.on("reload", () => {
        win.reload();
    });
}

app.on('ready', () => {

    CreateWindow();
});
app.on('window-all-closed', () => {
    app.quit();
});