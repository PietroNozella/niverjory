import { useMemo, useState } from "react";

type AcceptState = "idle" | "saving" | "accepted" | "error";

function getSessionId() {
  return new URLSearchParams(window.location.search).get("s") ?? "";
}

export default function AcceptScaleEnd() {
  const sessionId = useMemo(getSessionId, []);
  const [state, setState] = useState<AcceptState>("idle");

  const handleAccept = async () => {
    if (!sessionId || state === "saving" || state === "accepted") {
      return;
    }

    setState("saving");

    try {
      const response = await fetch("/api/access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId }),
      });

      if (!response.ok) {
        throw new Error("Could not accept access flow");
      }

      setState("accepted");
    } catch {
      setState("error");
    }
  };

  if (!sessionId) {
    return (
      <main className="relative grid min-h-svh place-items-center overflow-hidden bg-[#050505] px-6 text-center text-[#fff8ec]">
        <div className="qr-luminance" aria-hidden="true" />
        <p className="relative max-w-sm text-lg leading-8 text-[#f8e8cf]/86">
          Link inválido. Escaneie o QR code novamente.
        </p>
      </main>
    );
  }

  return (
    <main className="relative grid min-h-svh place-items-center overflow-hidden bg-[#050505] px-6 text-center text-[#fff8ec]">
      <div className="qr-luminance" aria-hidden="true" />
      <section className="relative z-10 flex w-full max-w-3xl flex-col items-center gap-8">
        <button
          type="button"
          onClick={handleAccept}
          disabled={state === "saving" || state === "accepted"}
          className="w-full rounded-[8px] border border-[#fff0ca]/30 bg-[#fff0ca] px-8 py-8 text-2xl font-black uppercase tracking-normal text-[#050505] shadow-warm-glow transition hover:scale-[1.01] hover:bg-white active:scale-[0.99] disabled:cursor-default disabled:opacity-80 sm:px-12 sm:py-12 sm:text-5xl"
        >
          {state === "saving" ? "ACEITANDO..." : "ACEITAR FIM DA ESCALA 6X1"}
        </button>

        {state === "accepted" ? (
          <p className="max-w-lg text-base leading-7 text-[#f8e8cf]/86 sm:text-lg">
            Aceito. A tela do QR code vai abrir a mensagem.
          </p>
        ) : null}

        {state === "error" ? (
          <p className="max-w-lg text-base leading-7 text-[#ffb4c8] sm:text-lg">
            Não consegui confirmar agora. Tente clicar novamente.
          </p>
        ) : null}
      </section>
    </main>
  );
}
