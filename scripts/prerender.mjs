import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.resolve(__dirname, "../dist");

// SSR entry output (make sure SSR build uses --outDir dist/server)
const serverEntryUrl = pathToFileURL(
  path.join(dist, "server", "entry-server.js")
).href;

const mod = await import(serverEntryUrl);

// Render only the app markup
const toolHtml = mod.renderToolHtml();

// Write ONLY the inner HTML (no doctype/head/scripts)
fs.writeFileSync(path.join(dist, "tool.html"), toolHtml, "utf-8");

console.log("✅ dist/tool.html generated");
