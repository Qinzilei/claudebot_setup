const { app, BrowserWindow, screen, ipcMain, Menu } = require('electron')
const path = require('path')

let win

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize

  win = new BrowserWindow({
    width: 200,
    height: 240,
    x: width - 220,
    y: height - 260,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    hasShadow: false,
    backgroundColor: '#00000000',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('renderer/index.html')

  // Start in click-through mode; renderer enables mouse events when hovering character
  win.setIgnoreMouseEvents(true, { forward: true })

  // ── IPC handlers ──────────────────────────────────────────

  ipcMain.on('set-ignore-mouse', (_, ignore) => {
    if (win) win.setIgnoreMouseEvents(ignore, { forward: true })
  })

  ipcMain.on('move-window', (_, { x, y }) => {
    if (win) win.setPosition(Math.round(x), Math.round(y))
  })

  ipcMain.handle('get-screen-size', () => {
    return screen.getPrimaryDisplay().workAreaSize
  })

  ipcMain.handle('get-window-pos', () => {
    if (!win) return { x: 0, y: 0 }
    const [x, y] = win.getPosition()
    return { x, y }
  })

  ipcMain.on('show-context-menu', () => {
    const menu = Menu.buildFromTemplate([
      { label: '🐾 Claude Desktop Pet', enabled: false },
      { type: 'separator' },
      { label: 'Quit', click: () => app.quit() }
    ])
    menu.popup({ window: win })
  })

  ipcMain.on('quit', () => app.quit())
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => app.quit())

// macOS: prevent background-throttling from slowing animation
app.commandLine.appendSwitch('disable-renderer-backgrounding')
