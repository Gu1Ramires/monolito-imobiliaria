export const precoCurto = (valor: number) => `R$ ${Math.round(valor / 1_000_000)} mi`

export const precoCompleto = (valor: number) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })

export const metros = (valor: number) => `${valor.toLocaleString('pt-BR')} m²`

export const iniciais = (nome: string) =>
  nome.split(' ').filter(Boolean).slice(0, 2).map((p) => p[0]).join('').toUpperCase()
