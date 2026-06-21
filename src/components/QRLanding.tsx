import { useEffect, useMemo, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

function createSessionId() {
  if (window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getAcceptUrl(sessionId: string) {
  const url = new URL("/aceitar", window.location.origin);
  url.searchParams.set("s", sessionId);

  return url.toString();
}

export default function QRLanding() {
  const [sessionId] = useState(createSessionId);
  const acceptUrl = useMemo(() => getAcceptUrl(sessionId), [sessionId]);

  useEffect(() => {
    let timeoutId = 0;
    let isDisposed = false;

    const checkAccess = async () => {
      try {
        const response = await fetch(`/api/access?sessionId=${encodeURIComponent(sessionId)}`, {
          cache: "no-store",
        });
        const data = (await response.json()) as { accepted?: boolean };

        if (data.accepted) {
          window.location.assign("/mensagem");
          return;
        }
      } catch {
        // Keep polling. The page may be running before the local API is ready.
      }

      if (!isDisposed) {
        timeoutId = window.setTimeout(checkAccess, 1200);
      }
    };

    checkAccess();

    return () => {
      isDisposed = true;
      window.clearTimeout(timeoutId);
    };
  }, [sessionId]);

  return (
    <main className="relative grid min-h-svh place-items-center overflow-hidden bg-[#050505] px-6 text-center">
      <div className="qr-luminance" aria-hidden="true" />

      <section className="relative z-10 flex flex-col items-center gap-6" data-accept-url={acceptUrl}>
        <div className="rounded-[8px] border border-[#f6dfb5]/20 bg-[#fffaf0] p-4 shadow-warm-glow sm:p-5">
          <QRCodeSVG
            value={acceptUrl}
            size={440}
            level="H"
            marginSize={2}
            bgColor="#fffaf0"
            fgColor="#050505"
            className="h-[min(72vw,440px)] w-[min(72vw,440px)]"
            aria-label="QR code"
          />
        </div>

        <p className="max-w-md text-base leading-7 text-[#f8e8cf]/78 sm:text-lg">
          Escaneie o QR code e aceite o fim da escala 6x1.
        </p>
      </section>
    </main>
  );
}