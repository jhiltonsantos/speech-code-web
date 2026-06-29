var import_meta_url=require("url").pathToFileURL(__filename).href;
"use strict";

// electron/preload.ts
var import_electron = require("electron");
var DESKTOP_API_PORT = "18765";
import_electron.contextBridge.exposeInMainWorld("speechCode", {
  getApiUrl: () => `http://127.0.0.1:${DESKTOP_API_PORT}`,
  checkOllama: () => import_electron.ipcRenderer.invoke("ollama:check"),
  isDesktop: true
});
