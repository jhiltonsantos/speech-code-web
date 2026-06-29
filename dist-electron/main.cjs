var import_meta_url=require("url").pathToFileURL(__filename).href;
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// electron/main.ts
var import_node_path3 = __toESM(require("node:path"), 1);
var import_node_url2 = require("node:url");
var import_electron2 = require("electron");

// electron/api-manager.ts
var import_node_http = __toESM(require("node:http"), 1);
var import_node_path2 = __toESM(require("node:path"), 1);
var import_node_child_process = require("node:child_process");
var import_node_fs = __toESM(require("node:fs"), 1);

// electron/paths.ts
var import_node_path = __toESM(require("node:path"), 1);
var import_node_url = require("node:url");
var import_electron = require("electron");
var DESKTOP_API_PORT = "18765";
function getApiUrl() {
  return `http://127.0.0.1:${DESKTOP_API_PORT}`;
}
function getUserDataDir() {
  return import_node_path.default.join(import_electron.app.getPath("appData"), "SpeechCode");
}
function getChromaDir() {
  return import_node_path.default.join(getUserDataDir(), "chroma_data");
}
function getTmpUploadDir() {
  return import_node_path.default.join(getUserDataDir(), "tmp_uploads");
}
function resolveApiRoot() {
  if (import_electron.app.isPackaged) {
    return import_node_path.default.join(process.resourcesPath, "api");
  }
  const webRoot = import_node_path.default.resolve(import_node_path.default.dirname((0, import_node_url.fileURLToPath)(import_meta_url)), "..");
  return import_node_path.default.resolve(webRoot, "..", "speech-code-api");
}
function resolveApiExecutable() {
  if (import_electron.app.isPackaged) {
    return import_node_path.default.join(process.resourcesPath, "api", "speechcode-api.exe");
  }
  return "";
}
function resolvePythonExecutable(apiRoot) {
  return import_node_path.default.join(apiRoot, ".venv", "Scripts", "python.exe");
}
function resolveWebBuildDir() {
  if (import_electron.app.isPackaged) {
    return import_node_path.default.join(import_electron.app.getAppPath(), "build");
  }
  return "";
}
function resolveDevServerUrl() {
  return process.env.VITE_DEV_SERVER_URL ?? "http://localhost:5173";
}

// electron/api-manager.ts
function ensureDir(dir) {
  import_node_fs.default.mkdirSync(dir, { recursive: true });
}
function waitForHealth(maxAttempts = 60, intervalMs = 500) {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const check = () => {
      const req = import_node_http.default.get(`${getApiUrl()}/health`, (res) => {
        res.resume();
        if (res.statusCode === 200) {
          resolve();
        } else {
          retry();
        }
      });
      req.on("error", retry);
      req.setTimeout(2e3, () => {
        req.destroy();
        retry();
      });
    };
    const retry = () => {
      attempts += 1;
      if (attempts >= maxAttempts) {
        reject(new Error("FastAPI n\xE3o respondeu a tempo."));
        return;
      }
      setTimeout(check, intervalMs);
    };
    check();
  });
}
async function startApiProcess() {
  const apiRoot = resolveApiRoot();
  const chromaDir = getChromaDir();
  const tmpDir = getTmpUploadDir();
  ensureDir(chromaDir);
  ensureDir(tmpDir);
  const env = {
    ...process.env,
    API_PORT: DESKTOP_API_PORT,
    SPEECHCODE_DESKTOP: "1",
    CHROMA_DIR: chromaDir,
    TMP_UPLOAD_DIR: tmpDir
  };
  const packagedExe = resolveApiExecutable();
  let child;
  if (packagedExe) {
    child = (0, import_node_child_process.spawn)(packagedExe, [], {
      cwd: import_node_path2.default.dirname(packagedExe),
      env,
      stdio: "pipe"
    });
  } else {
    const python = resolvePythonExecutable(apiRoot);
    child = (0, import_node_child_process.spawn)(
      python,
      ["-m", "uvicorn", "main:app", "--host", "127.0.0.1", "--port", DESKTOP_API_PORT],
      { cwd: apiRoot, env, stdio: "pipe" }
    );
  }
  child.stdout?.on("data", (chunk) => console.log("[api]", chunk.toString()));
  child.stderr?.on("data", (chunk) => console.error("[api]", chunk.toString()));
  await waitForHealth();
  return child;
}
function stopApiProcess(child) {
  if (!child || child.killed) return;
  child.kill();
}
async function checkOllama(baseUrl = "http://localhost:11434") {
  return new Promise((resolve) => {
    const req = import_node_http.default.get(`${baseUrl}/api/tags`, (res) => {
      res.resume();
      resolve(res.statusCode === 200);
    });
    req.on("error", () => resolve(false));
    req.setTimeout(3e3, () => {
      req.destroy();
      resolve(false);
    });
  });
}

// electron/main.ts
var __dirname = import_node_path3.default.dirname((0, import_node_url2.fileURLToPath)(import_meta_url));
var mainWindow = null;
var apiProcess = null;
var isQuitting = false;
async function createWindow() {
  mainWindow = new import_electron2.BrowserWindow({
    width: 1100,
    height: 800,
    minWidth: 720,
    minHeight: 600,
    title: "SpeechCode",
    webPreferences: {
      preload: import_node_path3.default.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });
  if (import_electron2.app.isPackaged) {
    const indexHtml = import_node_path3.default.join(resolveWebBuildDir(), "index.html");
    await mainWindow.loadFile(indexHtml);
  } else {
    await mainWindow.loadURL(resolveDevServerUrl());
  }
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}
import_electron2.app.whenReady().then(async () => {
  import_electron2.ipcMain.handle("ollama:check", () => checkOllama());
  try {
    apiProcess = await startApiProcess();
  } catch (error) {
    console.error("Falha ao iniciar API:", error);
  }
  await createWindow();
  import_electron2.app.on("activate", async () => {
    if (import_electron2.BrowserWindow.getAllWindows().length === 0) {
      await createWindow();
    }
  });
});
import_electron2.app.on("before-quit", () => {
  isQuitting = true;
  stopApiProcess(apiProcess);
  apiProcess = null;
});
import_electron2.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    import_electron2.app.quit();
  }
});
process.on("exit", () => {
  if (!isQuitting) {
    stopApiProcess(apiProcess);
  }
});
console.log("SpeechCode API:", getApiUrl());
