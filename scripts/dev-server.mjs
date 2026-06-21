import { createServer as createHttpServer } from "node:http";
import { createServer as createViteServer } from "vite";

const sessions = new Map();

function getPort() {
  const portIndex = process.argv.indexOf("--port");

  if (portIndex >= 0) {
    return Number(process.argv[portIndex + 1]);
  }

  return Number(process.env.PORT ?? 5173);
}

function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json",
  });
  response.end(JSON.stringify(body));
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;
    });
    request.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
    request.on("error", reject);
  });
}

async function handleAccessApi(request, response, url) {
  if (request.method === "GET") {
    const sessionId = url.searchParams.get("sessionId")?.trim() ?? "";

    if (!sessionId) {
      sendJson(response, 400, { error: "sessionId is required" });
      return;
    }

    sendJson(response, 200, { accepted: sessions.get(sessionId)?.accepted ?? false });
    return;
  }

  if (request.method === "POST") {
    const body = await readBody(request);
    const sessionId = typeof body.sessionId === "string" ? body.sessionId.trim() : "";

    if (!sessionId) {
      sendJson(response, 400, { error: "sessionId is required" });
      return;
    }

    sessions.set(sessionId, {
      accepted: true,
      updatedAt: Date.now(),
    });
    sendJson(response, 200, { accepted: true });
    return;
  }

  response.setHeader("Allow", "GET, POST");
  sendJson(response, 405, { error: "method not allowed" });
}

async function start(port) {
  const vite = await createViteServer({
    appType: "spa",
    server: {
      host: "0.0.0.0",
      middlewareMode: true,
    },
  });

  const server = createHttpServer(async (request, response) => {
    const host = request.headers.host ?? `localhost:${port}`;
    const url = new URL(request.url ?? "/", `http://${host}`);

    if (url.pathname === "/api/access") {
      try {
        await handleAccessApi(request, response, url);
      } catch {
        sendJson(response, 400, { error: "invalid request" });
      }
      return;
    }

    vite.middlewares(request, response);
  });

  server.on("error", async (error) => {
    if (error.code === "EADDRINUSE") {
      await vite.close();
      start(port + 1);
      return;
    }

    throw error;
  });

  server.listen(port, "0.0.0.0", () => {
    console.log(`VITE + API ready at http://localhost:${port}/`);
  });
}

start(getPort());
