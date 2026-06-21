# Birthday QR Experience

Site em React + Vite para uma experiência de feliz aniversário acessada por QR code.

## Fluxo

1. A página inicial (`/`) mostra o QR code no desktop.
2. O QR code abre `/aceitar?s=...` no celular.
3. O celular mostra o botão `ACEITAR FIM DA ESCALA 6X1`.
4. Ao clicar no botão, a tela do QR code no desktop muda automaticamente para `/mensagem`.

O fluxo usa polling em `/api/access` com sessão em memória. É simples e suficiente para uso pontual; se precisar persistência real entre instâncias/escala, use Supabase ou outro storage compartilhado.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra a URL exibida no terminal.

## Build

```bash
npm run build
```

Para testar o build localmente:

```bash
npm run preview
```

## Trocar a mensagem

Edite o arquivo:

```txt
src/data/birthdayMessage.ts
```

Campos disponíveis:

```ts
export const birthdayMessage = {
  title: "Feliz aniversário!",
  body: "Que o seu dia seja leve, bonito e cheio de carinho. Hoje o mundo tem um motivo a mais para celebrar.",
};
```

## Estrutura dos efeitos

- `src/components/effects/Particles.tsx`: fundo de partículas do React Bits com `ogl`.
- `src/components/effects/AmbientFallback.tsx`: fallback mais leve para dispositivos fracos e `prefers-reduced-motion`.
- `src/hooks/useVisualMode.ts`: decide quando usar o efeito animado ou fallback.

## Deploy

O `vercel.json` preserva `/api/*` e usa rewrite para SPA nas demais rotas, permitindo abrir `/aceitar` e `/mensagem` diretamente após deploy.