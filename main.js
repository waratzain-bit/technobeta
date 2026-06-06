import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true, // Biarkan true agar aman
    },
  });

  // Logika path yang akurat untuk struktur files: ["main.js", "dist/**/*"]
  const indexPath = app.isPackaged
    ? path.join(__dirname, 'dist', 'index.html') 
    : path.join(__dirname, 'dist', 'index.html');

  win.loadFile(indexPath).catch((err) => {
    console.error("Gagal memuat:", err);
  });
}

app.whenReady().then(createWindow);