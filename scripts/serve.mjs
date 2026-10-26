// Minimal static server for dist/ (local preview and QA). node scripts/serve.mjs [port]
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml', '.pdf': 'application/pdf' };
export function serve(port = 4321) {
  return new Promise((res) => {
    const s = createServer(async (req, rsp) => {
      let p = join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname));
      try { if ((await stat(p)).isDirectory()) p = join(p, 'index.html'); const b = await readFile(p); rsp.writeHead(200, { 'content-type': TYPES[extname(p)] || 'application/octet-stream' }); rsp.end(b); }
      catch { rsp.writeHead(404, { 'content-type': TYPES['.html'] }); rsp.end(await readFile(join(ROOT, '404.html')).catch(() => 'Not found')); }
    }).listen(port, () => res(s));
  });
}
if (process.argv[1] === fileURLToPath(import.meta.url)) { const port = +process.argv[2] || 4321; await serve(port); console.log(`http://localhost:${port}`); }
