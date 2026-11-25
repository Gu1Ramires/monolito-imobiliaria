# MONOLITO — Residências de exceção

Site fictício de uma imobiliária de alto luxo, feito para a disciplina na UMC.
Na página inicial, uma casa em 3D se constrói conforme o scroll: **Fundação → Estrutura → Fachada de vidro → Pronta para viver**.

**Deploy:** https://monolito-imobiliaria.vercel.app _(troque pelo link real)_

## Stack
- React 19 + Vite + TypeScript
- Bootstrap 5 + react-bootstrap
- React Router
- Motion (Framer Motion): transições de página, revelações e microinterações
- Three.js + React Three Fiber + Drei: hero 3D gerado em código, sem modelo externo
- Lenis: scroll suave

## Páginas
| Rota | Página |
|---|---|
| `/` | Home com hero 3D, destaques, destinos, galeria, planta, tecnologia e CTA |
| `/residencias` | Listagem com filtros (paisagem, suítes, ordenação) |
| `/residencias/:slug` | Detalhe: ficha técnica, galeria com lightbox, vídeo, planta por pavimento, localização |
| `/destinos` | Os sete destinos da coleção |
| `/sobre` | Manifesto, linha do tempo, sócios e valores |
| `/contato` | Formulário de visita com validação (`?residencia=slug` pré-seleciona) |
| `*` | 404 |

## Como rodar
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera /dist
```

## Contato
Telefone, WhatsApp e e-mail ficam em `src/data/contato.ts`. Altere só lá.

## Imagens
Cada casa tem a própria pasta em `public/images/casas/<slug>/`, com 5 arquivos:
`fachada.jpg`, `vista.jpg`, `interior.jpg`, `lazer.jpg` e `planta.jpg`.
Para usar as imagens geradas por IA, substitua os arquivos **mantendo os mesmos nomes**. Nada no código precisa mudar.
A imagem extra de Gramado fica em `public/images/destinos/gramado.jpg`.

## Vídeos (opcionais)
- `public/videos/hero.mp4`: se existir, o topo da Home troca o 3D por esse vídeo, controlado pelo scroll.
  Para ficar fluido: `ffmpeg -i entrada.mp4 -vf scale=1920:-2 -c:v libx264 -g 1 -crf 22 -an public/videos/hero.mp4`
- `public/videos/tour.mp4`: ativa os vídeos da galeria e o botão "Assistir o filme".
Sem esses arquivos o site continua funcionando: mostra o 3D e uma imagem com aviso no lugar do filme.

## Estrutura
```
src/
  components/
    hero/     HeroHouse3D, Scene, HouseModel, HeroOverlay
    fx/       BlurText, Reveal, SpotlightCard, CountUp, Magnetic, ImageReveal
    layout/   Navbar, Footer, PageTransition, SmoothScroll
    Gallery, FloorPlan, ResidenciaCard, CtaVisita, VideoModal, SectionTitle, Icons
  data/       residencias.ts, destinos.ts
  hooks/      useScrollProgress, usePrefersReducedMotion, useVideoAvailable
  pages/      Home, Residencias, ResidenciaDetalhe, Destinos, Sobre, Contato, NotFound
  styles/     theme.css, global.css
```

Projeto acadêmico · Guilherme Ramires Lana · Sistemas de Informação, UMC
