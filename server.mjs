import { readFile } from "node:fs/promises";
import { createServer } from "node:http";

const home = new URL("./index.html", import.meta.url);
const port = Number(process.env.PORT ?? 3000);

const server = createServer(async (request, response) => {
  if (request.url !== "/") {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Page not found");
    return;
  }

  try {
    const page = await readFile(home);
    response.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    });
    response.end(page);
  } catch {
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("The demo page could not load.");
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Vendi Demo is running at http://127.0.0.1:${server.address().port}`);
});
