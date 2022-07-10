import { release } from 'os'
import { join } from 'path'
import { app, BrowserWindow, shell, ipcMain } from 'electron'

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

export const ROOT_PATH = {
  dist: join(__dirname, '..'),
  public: join(__dirname, app.isPackaged ? '..' : '../../public'),
}

let win: BrowserWindow | null = null

const preload = join(__dirname, '../preload/index.js')
const url = `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`
const indexHtml = join(ROOT_PATH.dist, 'index.html')

async function createWindow() {
  win = new BrowserWindow({
    title: 'Wwise TTS',
    icon: join(ROOT_PATH.public, 'favicon.ico'),
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  if (app.isPackaged) {
    win.loadFile(indexHtml);
  } else {
    win.loadURL(url);
  }

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  win = null;
  app.quit();
})


// Focus on the main window if the user tried to open another
app.on('second-instance', () => {
  if (win) {
    if (win.isMinimized()) {
      win.restore();
    }
    win.focus();
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
})


// IPC Handler
import wwise from "./ipc/wwise";
import msspeech from "./ipc/msspeech";
import file from "./ipc/file";

ipcMain.handle("wwise:getInfo", async (_event, args) => {
  const info = await wwise.getInfo(args);
  return info;
});

ipcMain.handle("wwise:importAudio", async (_event, args) => {
  await wwise.importAudio(args);
});

ipcMain.handle("msspeech:getVoices", async (_event, args) => {
  const voices = await msspeech.getVoices(args);
  return voices;
});

ipcMain.handle("msspeech:synthesizeAudio", async (_event, args) => {
  await msspeech.synthesizeAudio(args);
});

ipcMain.handle("file:readJson", async (_event, args) => {
  const data = await file.readJson(args);
  return data;
});

ipcMain.handle("file:writeJson", async (_event, args) => {
  await file.writeJson(args);
});

ipcMain.handle("file:openUserData", async (_event, _args) => {
  await file.openUserData();
});
