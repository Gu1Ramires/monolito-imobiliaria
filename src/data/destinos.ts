import { img } from './residencias'

export interface Destino {
  cidade: string
  uf: string
  paisagem: string
  texto: string
  imagem: string
}

export const destinos: Destino[] = [
  { cidade: 'Ilhabela', uf: 'SP', paisagem: 'Acesso por mar e heliponto', texto: 'Mata Atlântica que desce até o canal, praias sem estrada e o melhor vento para velejar do litoral paulista.', imagem: img('casa-horizonte', 'vista') },
  { cidade: 'Florianópolis', uf: 'SC', paisagem: 'Penhasco sobre o Atlântico', texto: 'Costões de granito, marinas e restaurantes de frutos do mar, a 35 minutos do aeroporto internacional.', imagem: img('mirante-atlantico', 'vista') },
  { cidade: 'Campos do Jordão', uf: 'SP', paisagem: 'Serra da Mantiqueira, 1.700 m', texto: 'Araucárias, neblina nas manhãs de inverno e a vida cultural do festival de música erudita.', imagem: img('residencia-nevoa', 'vista') },
  { cidade: 'Jericoacoara', uf: 'CE', paisagem: 'Dunas e lagoas de água doce', texto: 'Um parque nacional de dunas que se movem, lagoas cristalinas e o pôr do sol aplaudido todos os dias.', imagem: img('casa-duna', 'vista') },
  { cidade: 'Trancoso', uf: 'BA', paisagem: 'Falésias e coqueirais', texto: 'O Quadrado histórico, praias de águas mornas e uma vida descalça entre falésias coloridas.', imagem: img('villa-basalto', 'vista') },
  { cidade: 'Nova Lima', uf: 'MG', paisagem: 'Vista para a Serra do Curral', texto: 'Condomínios de mata preservada a 25 minutos de Belo Horizonte, com o clima ameno das montanhas.', imagem: img('pavilhao-serra', 'vista') },
  { cidade: 'Gramado', uf: 'RS', paisagem: 'Vales da Serra Gaúcha', texto: 'Cânions, vinícolas e um inverno de verdade, com lareira acesa de maio a setembro.', imagem: '/images/destinos/gramado.jpg' },
]
