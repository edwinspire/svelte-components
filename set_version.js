// bump-version.js
import fs from "fs";
import path from "path";

const packagePath = path.resolve("package.json");
const versionFilePath = path.resolve("./src/lib/version.js");

// Leer package.json
const packageData = JSON.parse(fs.readFileSync(packagePath, "utf8"));

// Obtener y dividir versión
let version = packageData.version || "0.0.0";
let parts = version.split(".").map(Number);

// Incrementar el último número (patch)
parts[2] = parts[2] + 1;
let newVersion = parts.join(".");

// Actualizar package.json
packageData.version = newVersion;
fs.writeFileSync(packagePath, JSON.stringify(packageData, null, 2) + "\n", "utf8");

// Asegurarse que la carpeta existe
fs.mkdirSync(path.dirname(versionFilePath), { recursive: true });

// Crear version.js
fs.writeFileSync(versionFilePath, `export const version = '${newVersion}';\n`, "utf8");

console.log(`Versión actualizada a ${newVersion}`);
