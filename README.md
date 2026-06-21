# Birthday QR Experience

Site em React + Vite para uma experiência de feliz aniversário acessada por QR code.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra a URL exibida no terminal. A página inicial (`/`) mostra apenas o QR code, que aponta para `/mensagem` no mesmo domínio.

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

- `src/components/effects/CosmicScene.tsx`: fundo 3D com Three.js, carregado com lazy loading.
- `src/components/effects/AmbientFallback.tsx`: fallback mais leve para mobile, dispositivos fracos e `prefers-reduced-motion`.
- `src/hooks/useVisualMode.ts`: decide quando usar o efeito pesado ou o fallback.

## Deploy

O `vercel.json` já inclui rewrite para SPA, permitindo abrir `/mensagem` diretamente após deploy.
