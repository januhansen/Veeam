const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

// Veeam Backup Kalkulator - desktop wrapper
//
// This is a thin Electron shell around veeambackupkalkulator.html, which is a fully
// self-contained tool (all CSS/JS and the PptxGenJS/JSZip libraries are embedded inline,
// no network calls). Wrapping it here just gives it a real window, a Start Menu entry,
// and hides the browser chrome (address bar, tabs) so it feels like a normal desktop app -
// none of the calculator's own logic lives in this file.

function createWindow() {
  const win = new BrowserWindow({
    width: 1440,
    height: 920,
    minWidth: 960,
    minHeight: 640,
    icon: path.join(__dirname, 'build', 'icon.ico'),
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
    },
  });

  Menu.setApplicationMenu(null);
  win.loadFile(path.join(__dirname, 'veeambackupkalkulator.html'));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
