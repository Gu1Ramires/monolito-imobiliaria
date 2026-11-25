export type Regiao = 'litoral' | 'serra' | 'nordeste'
export type Status = 'Lançamento' | 'Em obra' | 'Pronta' | 'Última unidade'

export type Midia =
  | { tipo: 'foto'; src: string; titulo: string; categoria: string }
  | { tipo: 'video'; src: string; poster: string; titulo: string; categoria: string; duracao: string }

export interface Comodo { nome: string; area: string }
export interface Pavimento { nome: string; comodos: Comodo[] }
export interface Distancia { lugar: string; tempo: string }

export interface Residencia {
  slug: string
  nome: string
  cidade: string
  uf: string
  regiao: Regiao
  bairro: string
  status: Status
  area: number
  terreno: number
  suites: number
  vagas: string
  preco: number
  destaque: string
  imagem: string
  planta: string
  galeria: Midia[]
  descricao: [string, string]
  pavimentos: Pavimento[]
  distancias: Distancia[]
  ordem: number
}

/** Todas as imagens de uma casa ficam em public/images/casas/<slug>/ com estes nomes. */
export type Foto = 'fachada' | 'vista' | 'interior' | 'lazer' | 'planta'
export const img = (slug: string, foto: Foto) => `/images/casas/${slug}/${foto}.jpg`

/** Galeria padrão: fachada, interior, vídeo, lazer e vista. */
function galeria(slug: string, t: [string, string, string, string, string], duracao: string): Midia[] {
  return [
    { tipo: 'foto', src: img(slug, 'fachada'), titulo: t[0], categoria: 'Arquitetura' },
    { tipo: 'foto', src: img(slug, 'interior'), titulo: t[1], categoria: 'Interior' },
    { tipo: 'video', src: '/videos/tour.mp4', poster: img(slug, 'vista'), titulo: t[2], categoria: 'Filme', duracao },
    { tipo: 'foto', src: img(slug, 'lazer'), titulo: t[3], categoria: 'Lazer' },
    { tipo: 'foto', src: img(slug, 'vista'), titulo: t[4], categoria: 'Vista' },
  ]
}

export const residencias: Residencia[] = [
  {
    slug: 'casa-horizonte',
    nome: 'Casa Horizonte',
    cidade: 'Ilhabela',
    uf: 'SP',
    bairro: 'Ponta das Canas',
    regiao: 'litoral',
    status: 'Lançamento',
    area: 1240,
    terreno: 8600,
    suites: 6,
    vagas: '8 + heliponto',
    preco: 48_000_000,
    destaque: 'heliponto',
    imagem: img('casa-horizonte', 'fachada'),
    planta: img('casa-horizonte', 'planta'),
    ordem: 1,
    galeria: galeria('casa-horizonte', ['Fachada ao entardecer', 'Jantar diante da serra', 'Um dia na Casa Horizonte', 'Piscina de borda infinita', 'Terraço ao anoitecer'], '1:42'),
    descricao: [
      'A Casa Horizonte ocupa a encosta mais alta da Ponta das Canas. O pavimento social é um único vão de vidro de 60 metros que desaparece quando as esquadrias deslizam, ligando living, jantar e cozinha à piscina de borda infinita.',
      'Acima, um volume de concreto e travertino abriga as suítes em balanço sobre o jardim. Toda a casa é controlada por voz e por um único aplicativo.',
    ],
    pavimentos: [
      { nome: 'Térreo', comodos: [
        { nome: 'Living integrado', area: '140 m²' }, { nome: 'Jantar para 14', area: '60 m²' }, { nome: 'Cozinha gourmet', area: '48 m²' },
        { nome: 'Adega climatizada', area: '22 m²' }, { nome: 'Spa com sauna', area: '36 m²' }, { nome: 'Piscina de borda infinita', area: '32 m' },
      ] },
      { nome: 'Superior', comodos: [
        { nome: 'Suíte master com closet', area: '120 m²' }, { nome: 'Suítes 2 a 6', area: '45 m² cada' }, { nome: 'Home office', area: '28 m²' }, { nome: 'Terraço privativo', area: '90 m²' },
      ] },
      { nome: 'Subsolo', comodos: [
        { nome: 'Garagem', area: '8 vagas' }, { nome: 'Cinema', area: '40 m²' }, { nome: 'Academia', area: '55 m²' }, { nome: 'Sala segura', area: '18 m²' },
      ] },
    ],
    distancias: [
      { lugar: 'Heliponto privativo', tempo: 'na propriedade' },
      { lugar: 'São Paulo de helicóptero', tempo: '40 min' },
      { lugar: 'Iate clube', tempo: '6 min' },
      { lugar: 'Praia do Jabaquara', tempo: '12 min' },
    ],
  },
  {
    slug: 'mirante-atlantico',
    nome: 'Mirante Atlântico',
    cidade: 'Florianópolis',
    uf: 'SC',
    bairro: 'Costão de Jurerê',
    regiao: 'litoral',
    status: 'Em obra',
    area: 1120,
    terreno: 6200,
    suites: 6,
    vagas: '6 + píer',
    preco: 44_000_000,
    destaque: 'píer privativo',
    imagem: img('mirante-atlantico', 'fachada'),
    planta: img('mirante-atlantico', 'planta'),
    ordem: 2,
    galeria: galeria('mirante-atlantico', ['O costão iluminado', 'Sala de estar suspensa', 'Noite no Mirante', 'Piscina sobre o mar', 'Mar aberto e lua cheia'], '2:05'),
    descricao: [
      'Ancorado na rocha do costão, o Mirante Atlântico avança 14 metros sobre o mar. A sala de estar flutua acima das ondas, com piso de vidro na ponta do balanço.',
      'Um píer privativo recebe lanchas de até 60 pés, e o elevador panorâmico liga a garagem náutica à cobertura.',
    ],
    pavimentos: [
      { nome: 'Social', comodos: [{ nome: 'Living suspenso', area: '120 m²' }, { nome: 'Jantar', area: '50 m²' }, { nome: 'Cozinha aberta', area: '42 m²' }, { nome: 'Varanda em balanço', area: '80 m²' }] },
      { nome: 'Íntimo', comodos: [{ nome: 'Suíte master', area: '110 m²' }, { nome: 'Suítes 2 a 6', area: '42 m² cada' }, { nome: 'Sala de TV', area: '35 m²' }] },
      { nome: 'Náutico', comodos: [{ nome: 'Garagem náutica', area: '2 lanchas' }, { nome: 'Píer privativo', area: '40 m' }, { nome: 'Spa', area: '30 m²' }] },
    ],
    distancias: [
      { lugar: 'Praia de Jurerê', tempo: '4 min' },
      { lugar: 'Aeroporto Hercílio Luz', tempo: '35 min' },
      { lugar: 'Marina', tempo: '8 min' },
      { lugar: 'Centro de Florianópolis', tempo: '30 min' },
    ],
  },
  {
    slug: 'casa-duna',
    nome: 'Casa Duna',
    cidade: 'Jericoacoara',
    uf: 'CE',
    bairro: 'Serrote',
    regiao: 'nordeste',
    status: 'Pronta',
    area: 1050,
    terreno: 12000,
    suites: 6,
    vagas: '4 + hangar de buggy',
    preco: 41_000_000,
    destaque: 'spa',
    imagem: img('casa-duna', 'fachada'),
    planta: img('casa-duna', 'planta'),
    ordem: 3,
    galeria: galeria('casa-duna', ['A casa entre as dunas', 'Varanda de estar', 'Pôr do sol na Duna', 'Piscina de água salgada', 'Dunas e lagoa'], '1:58'),
    descricao: [
      'Paredes de pedra calcária e madeira de reflorestamento protegem a Casa Duna do vento e do sol do sertão litorâneo. O pátio interno sombreado concentra a vida da casa.',
      'O spa ocupa um volume próprio, com hammam, sala de massagem e uma piscina de água salgada voltada para o pôr do sol mais famoso do Ceará.',
    ],
    pavimentos: [
      { nome: 'Térreo', comodos: [{ nome: 'Pátio interno', area: '160 m²' }, { nome: 'Living', area: '110 m²' }, { nome: 'Cozinha regional', area: '45 m²' }, { nome: 'Spa com hammam', area: '70 m²' }] },
      { nome: 'Superior', comodos: [{ nome: 'Suíte master', area: '95 m²' }, { nome: 'Suítes 2 a 6', area: '40 m² cada' }, { nome: 'Mirante', area: '60 m²' }] },
    ],
    distancias: [
      { lugar: 'Vila de Jericoacoara', tempo: '10 min' },
      { lugar: 'Pedra Furada', tempo: '15 min' },
      { lugar: 'Aeroporto de Jericoacoara', tempo: '40 min' },
      { lugar: 'Lagoa do Paraíso', tempo: '25 min' },
    ],
  },
  {
    slug: 'residencia-nevoa',
    nome: 'Residência Névoa',
    cidade: 'Campos do Jordão',
    uf: 'SP',
    bairro: 'Alto do Capivari',
    regiao: 'serra',
    status: 'Última unidade',
    area: 860,
    terreno: 5400,
    suites: 5,
    vagas: '6',
    preco: 29_000_000,
    destaque: 'lareira',
    imagem: img('residencia-nevoa', 'fachada'),
    planta: img('residencia-nevoa', 'planta'),
    ordem: 4,
    galeria: galeria('residencia-nevoa', ['A casa na neblina', 'Sala da lareira', 'Inverno na Mantiqueira', 'Piscina aquecida', 'Araucárias ao amanhecer'], '2:12'),
    descricao: [
      'Entre araucárias centenárias, a Residência Névoa combina madeira carbonizada e vidro do piso ao teto. A lareira de pedra atravessa os dois pavimentos e aquece a casa inteira.',
      'A piscina coberta é aquecida a 32 °C o ano todo, e a adega subterrânea mantém a temperatura natural da serra.',
    ],
    pavimentos: [
      { nome: 'Térreo', comodos: [{ nome: 'Sala da lareira', area: '95 m²' }, { nome: 'Jantar', area: '40 m²' }, { nome: 'Cozinha', area: '38 m²' }, { nome: 'Piscina coberta', area: '18 m' }] },
      { nome: 'Superior', comodos: [{ nome: 'Suíte master', area: '85 m²' }, { nome: 'Suítes 2 a 5', area: '38 m² cada' }, { nome: 'Biblioteca', area: '30 m²' }] },
    ],
    distancias: [
      { lugar: 'Vila Capivari', tempo: '6 min' },
      { lugar: 'Auditório Claudio Santoro', tempo: '12 min' },
      { lugar: 'São Paulo de carro', tempo: '2 h 40' },
      { lugar: 'Heliponto da cidade', tempo: '10 min' },
    ],
  },
  {
    slug: 'villa-basalto',
    nome: 'Villa Basalto',
    cidade: 'Trancoso',
    uf: 'BA',
    bairro: 'Praia do Rio Verde',
    regiao: 'nordeste',
    status: 'Lançamento',
    area: 980,
    terreno: 9800,
    suites: 5,
    vagas: '4',
    preco: 36_000_000,
    destaque: 'pé na areia',
    imagem: img('villa-basalto', 'fachada'),
    planta: img('villa-basalto', 'planta'),
    ordem: 5,
    galeria: galeria('villa-basalto', ['Pavilhões pé na areia', 'Living aberto para a brisa', 'Um dia em Trancoso', 'Piscina diante do mar', 'Falésias e coqueirais'], '1:36'),
    descricao: [
      'Pé na areia da Praia do Rio Verde, a Villa Basalto é feita de pedra vulcânica escura, palha e madeira clara. Os pavilhões se espalham pelo jardim tropical e se conectam por passarelas.',
      'Cada suíte é um bangalô independente com banheira externa. O pavilhão social abre os quatro lados para a brisa do mar.',
    ],
    pavimentos: [
      { nome: 'Pavilhão social', comodos: [{ nome: 'Living aberto', area: '130 m²' }, { nome: 'Cozinha', area: '40 m²' }, { nome: 'Bar de praia', area: '25 m²' }] },
      { nome: 'Bangalôs', comodos: [{ nome: 'Bangalô master', area: '90 m²' }, { nome: 'Bangalôs 2 a 5', area: '50 m² cada' }, { nome: 'Spa', area: '35 m²' }] },
    ],
    distancias: [
      { lugar: 'Quadrado de Trancoso', tempo: '9 min' },
      { lugar: 'Praia dos Nativos', tempo: '7 min' },
      { lugar: 'Aeroporto de Porto Seguro', tempo: '55 min' },
      { lugar: 'Pista de pouso de Trancoso', tempo: '12 min' },
    ],
  },
  {
    slug: 'pavilhao-serra',
    nome: 'Pavilhão Serra',
    cidade: 'Nova Lima',
    uf: 'MG',
    bairro: 'Vale dos Cristais',
    regiao: 'serra',
    status: 'Em obra',
    area: 1400,
    terreno: 10500,
    suites: 7,
    vagas: '10',
    preco: 55_000_000,
    destaque: 'adega',
    imagem: img('pavilhao-serra', 'fachada'),
    planta: img('pavilhao-serra', 'planta'),
    ordem: 6,
    galeria: galeria('pavilhao-serra', ['A laje de 90 metros', 'O grande salão', 'Vista para a serra', 'Raia de 25 m', 'Serra do Curral ao anoitecer'], '2:30'),
    descricao: [
      'O Pavilhão Serra é uma única laje de 90 metros apoiada em 12 pilares de aço, com vista aberta para a Serra do Curral. Por baixo dela, tudo é vidro.',
      'A adega para 2.000 rótulos, a raia de 25 metros e a quadra coberta fazem do pavilhão um clube particular.',
    ],
    pavimentos: [
      { nome: 'Pavilhão', comodos: [{ nome: 'Grande salão', area: '220 m²' }, { nome: 'Jantar para 20', area: '70 m²' }, { nome: 'Cozinha profissional', area: '60 m²' }, { nome: 'Adega 2.000 rótulos', area: '40 m²' }] },
      { nome: 'Íntimo', comodos: [{ nome: 'Suíte master', area: '140 m²' }, { nome: 'Suítes 2 a 7', area: '45 m² cada' }, { nome: 'Home office', area: '35 m²' }] },
      { nome: 'Lazer', comodos: [{ nome: 'Raia coberta', area: '25 m' }, { nome: 'Quadra', area: '600 m²' }, { nome: 'Garagem', area: '10 vagas' }] },
    ],
    distancias: [
      { lugar: 'BH Shopping', tempo: '15 min' },
      { lugar: 'Centro de Belo Horizonte', tempo: '25 min' },
      { lugar: 'Aeroporto de Confins', tempo: '55 min' },
      { lugar: 'Heliponto do Vale', tempo: '5 min' },
    ],
  },
]

export const getResidencia = (slug?: string) => residencias.find((r) => r.slug === slug)
