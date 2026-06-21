type SessionState = {
  accepted: boolean;
  updatedAt: number;
};

type SessionStoreGlobal = typeof globalThis & {
  birthdayAccessSessions?: Map<string, SessionState>;
};

const sessionStoreGlobal = globalThis as SessionStoreGlobal;
const sessions = sessionStoreGlobal.birthdayAccessSessions ?? new Map<string, SessionState>();

sessionStoreGlobal.birthdayAccessSessions = sessions;

function sendJson(response: any, statusCode: number, body: unknown) {
  response.status(statusCode).json(body);
}

function getSessionId(request: any) {
  if (request.method === "GET") {
    return typeof request.query.sessionId === "string" ? request.query.sessionId : "";
  }

  return typeof request.body?.sessionId === "string" ? request.body.sessionId : "";
}

export default function handler(request: any, response: any) {
  const sessionId = getSessionId(request).trim();

  if (!sessionId) {
    sendJson(response, 400, { error: "sessionId is required" });
    return;
  }

  if (request.method === "GET") {
    sendJson(response, 200, { accepted: sessions.get(sessionId)?.accepted ?? false });
    return;
  }

  if (request.method === "POST") {
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
