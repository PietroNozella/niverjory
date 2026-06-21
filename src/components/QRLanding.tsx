import { QRCodeSVG } from "qrcode.react";

function getMessageUrl() {
  return new URL("/mensagem", window.location.origin).toString();
}

export default function QRLanding() {
  return (
    <main className="relative grid min-h-svh place-items-center overflow-hidden bg-[#050505] px-6">
      <div className="qr-luminance" aria-hidden="true" />

      <div className="relative rounded-[8px] border border-[#f6dfb5]/20 bg-[#fffaf0] p-4 shadow-warm-glow sm:p-5">
        <QRCodeSVG
          value={getMessageUrl()}
          size={440}
          level="H"
          marginSize={2}
          bgColor="#fffaf0"
          fgColor="#050505"
          className="h-[min(72vw,440px)] w-[min(72vw,440px)]"
          aria-label="QR code"
        />
      </div>
    </main>
  );
}
