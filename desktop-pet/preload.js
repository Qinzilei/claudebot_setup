const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('pet', {
  setIgnoreMouse:    (ignore)  => ipcRenderer.send('set-ignore-mouse', ignore),
  moveWindow:        (pos)     => ipcRenderer.send('move-window', pos),
  showContextMenu:   ()        => ipcRenderer.send('show-context-menu'),
  quit:              ()        => ipcRenderer.send('quit'),
  getScreenSize:     ()        => ipcRenderer.invoke('get-screen-size'),
  getWindowPos:      ()        => ipcRenderer.invoke('get-window-pos'),
})
