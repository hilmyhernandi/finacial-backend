import path from "path";
import { fileURLToPath } from "url";


export function getDirname(metaUrl: string) {
  const __filename = fileURLToPath(metaUrl);
  return path.dirname(__filename);
}

export function getFilename(metaUrl: string) {
  return fileURLToPath(metaUrl);
}
