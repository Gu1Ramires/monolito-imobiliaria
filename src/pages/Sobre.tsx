import BlurText from '../components/fx/BlurText'
import CountUp from '../components/fx/CountUp'
import ImageReveal from '../components/fx/ImageReveal'
import Reveal from '../components/fx/Reveal'
import SpotlightCard from '../components/fx/SpotlightCard'
import SectionTitle from '../components/SectionTitle'
import { iniciais } from '../utils/format'

const marcos = [
  { ano: '2014', t: 'Fundação', d: 'Três sócios, um escritório na Vila Madalena e a primeira encosta em Ilhabela.' },
  { ano: '2018', t: 'Primeira casa entregue', d: 'A Residência Névoa abre as portas, mobiliada até o último livro.' },
  { ano: '2022', t: 'Expansão para o Nordeste', d: 'Jericoacoara e Trancoso entram no mapa da coleção.' },
  { ano: '2027', t: 'Coleção de 12 residências', d: 'Doze endereços em sete destinos, com entrega das chaves prevista.' },
]

const socios = [
  { nome: 'Helena Vasconcelos', cargo: 'Arquitetura', bio: 'Formada pela FAU-USP, assina todos os projetos da coleção.' },
  { nome: 'Marco Bittencourt', cargo: 'Engenharia e obra', bio: 'Vinte anos de estruturas em balanço e terrenos difíceis.' },
  { nome: 'Isabela Rocha', cargo: 'Relacionamento', bio: 'Cuida de cada cliente da primeira visita à entrega das chaves.' },
]

const valores = [
  { t: 'Terreno primeiro', d: 'Nenhum projeto começa antes de conhecermos o lugar em todas as estações.' },
  { t: 'Projeto autoral', d: 'Cada casa é desenhada uma única vez. Não existem duas plantas iguais.' },
  { t: 'Tecnologia invisível', d: 'Automação, energia e segurança que trabalham sem aparecer.' },
  { t: 'Entrega mobiliada', d: 'Você recebe a casa pronta: móveis, louças, enxoval e adega abastecida.' },
]

export default function Sobre() {
  return (
    <>
      <header className="wrap page-header" style={{ paddingBottom: 96 }}>
        <p className="eyebrow">Sobre a MONOLITO</p>
        <BlurText as="h1" text={'Poucas casas.\nNenhuma pressa.'} className="display" />
      </header>

      <section className="wrap" style={{ paddingBottom: 140 }}>
        <div className="row g-5 align-items-center">
          <div className="col-lg-6">
            <ImageReveal src="/images/casas/residencia-nevoa/interior.jpg" alt="Interior de uma residência MONOLITO" ratio="4 / 5" />
          </div>
          <div className="col-lg-6">
            <Reveal>
              <h2 className="h-section" style={{ marginBottom: 28 }}>Construímos como quem escreve uma carta à mão.</h2>
              <p className="lead-text">
                A MONOLITO nasceu da recusa em repetir plantas. Em vez de lançar torres, escolhemos terrenos raros e
                desenhamos uma única casa para cada um deles.
              </p>
              <p className="lead-text">
                Arquitetura, engenharia, interiores e paisagismo ficam sob o mesmo teto. Assim, quem entra na casa
                pela primeira vez encontra tudo pronto, inclusive o vinho na adega.
              </p>
              <div className="stat-row" style={{ marginTop: 40 }}>
                <div><div className="serif" style={{ fontSize: 44 }}><CountUp to={12} /></div><div className="muted" style={{ fontSize: 13 }}>anos de história</div></div>
                <div><div className="serif" style={{ fontSize: 44 }}><CountUp to={38} /></div><div className="muted" style={{ fontSize: 13 }}>profissionais no estúdio</div></div>
                <div><div className="serif" style={{ fontSize: 44 }}><CountUp to={7} /></div><div className="muted" style={{ fontSize: 13 }}>destinos</div></div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="surface section">
        <div className="wrap">
          <SectionTitle eyebrow="Linha do tempo" title="Doze anos, doze casas." />
          <Reveal>
            <ol className="timeline">
              {marcos.map((m) => (
                <li key={m.ano}>
                  <span className="serif gold" style={{ fontSize: 44 }}>{m.ano}</span>
                  <h3 style={{ fontFamily: 'var(--sans)', fontSize: 18, fontWeight: 600, margin: '8px 0 10px' }}>{m.t}</h3>
                  <p className="muted" style={{ fontSize: 15, lineHeight: 1.6 }}>{m.d}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="wrap section">
        <SectionTitle eyebrow="Sócios fundadores" title="Quem desenha, constrói e entrega." />
        <div className="row g-4">
          {socios.map((s, i) => (
            <Reveal key={s.nome} delay={i * 0.12} className="col-md-4">
              <div style={{ borderTop: '1px solid var(--line)', paddingTop: 28 }}>
                <span className="avatar lg" aria-hidden="true">{iniciais(s.nome)}</span>
                <h3 style={{ fontSize: 32, margin: '22px 0 4px' }}>{s.nome}</h3>
                <p className="small-label gold" style={{ marginBottom: 14 }}>{s.cargo}</p>
                <p className="body-text mb-0" style={{ fontSize: 16 }}>{s.bio}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: 140 }}>
        <SectionTitle eyebrow="O que não negociamos" title="Valores" />
        <Reveal>
          <div className="tech-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
            {valores.map((v, i) => (
              <SpotlightCard key={v.t}>
                <span className="serif gold" style={{ fontSize: 28 }}>{String(i + 1).padStart(2, '0')}</span>
                <h3 style={{ fontFamily: 'var(--sans)', fontSize: 18, fontWeight: 600, margin: '16px 0 10px' }}>{v.t}</h3>
                <p className="muted mb-0" style={{ fontSize: 15, lineHeight: 1.6 }}>{v.d}</p>
              </SpotlightCard>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  )
}
