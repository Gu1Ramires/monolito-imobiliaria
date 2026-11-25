import { Link } from 'react-router-dom'
import HeroHouse3D from '../components/hero/HeroHouse3D'
import BlurText from '../components/fx/BlurText'
import CountUp from '../components/fx/CountUp'
import Reveal from '../components/fx/Reveal'
import SpotlightCard from '../components/fx/SpotlightCard'
import SectionTitle from '../components/SectionTitle'
import ResidenciaCard from '../components/ResidenciaCard'
import Gallery from '../components/Gallery'
import CtaVisita from '../components/CtaVisita'
import { IconGlass, IconMic, IconShield, IconSun, IconWaves, IconWine } from '../components/Icons'
import { getResidencia, residencias } from '../data/residencias'
import { destinos } from '../data/destinos'

const tecnologia = [
  { icon: <IconMic />, t: 'Automação por voz', d: 'Cenas de luz, som e cortinas em 14 ambientes.' },
  { icon: <IconGlass />, t: 'Vidro eletrocrômico', d: 'A fachada escurece sozinha conforme o sol.' },
  { icon: <IconSun />, t: 'Energia autônoma', d: 'Solar com baterias: 72 horas fora da rede.' },
  { icon: <IconShield />, t: 'Segurança perimetral', d: 'Sensores, reconhecimento facial e sala segura.' },
  { icon: <IconWine />, t: 'Adega climatizada', d: '1.200 rótulos em temperatura controlada.' },
  { icon: <IconWaves />, t: 'Spa e piscina aquecida', d: 'Sauna seca e úmida, borda infinita de 32 m.' },
]

export default function Home() {
  const destaque = ['casa-horizonte', 'mirante-atlantico', 'casa-duna'].map((s) => getResidencia(s)!)
  const horizonte = residencias[0]
  const paisagens = [destinos[1], destinos[2], destinos[3], destinos[0]]

  return (
    <>
      <HeroHouse3D />

      {/* Manifesto */}
      <section className="wrap section">
        <div className="row g-5 align-items-end">
          <div className="col-lg-6">
            <BlurText text="Doze endereços." highlight="Nenhum igual ao outro." className="h-section" />
          </div>
          <div className="col-lg-6">
            <Reveal>
              <p className="lead-text" style={{ marginBottom: 40 }}>
                Cada residência MONOLITO nasce para um único terreno: o penhasco, a mata, a duna. Projeto autoral,
                obra entregue mobiliada e uma casa que pensa por você, da luz ao clima.
              </p>
              <div className="stat-row">
                <div><div className="serif" style={{ fontSize: 44 }}><CountUp to={12} /></div><div className="muted" style={{ fontSize: 13, letterSpacing: '.08em' }}>residências na coleção</div></div>
                <div><div className="serif" style={{ fontSize: 44 }}><CountUp to={7} /></div><div className="muted" style={{ fontSize: 13, letterSpacing: '.08em' }}>destinos no Brasil</div></div>
                <div><div className="serif" style={{ fontSize: 44 }}><CountUp from={2000} to={2027} /></div><div className="muted" style={{ fontSize: 13, letterSpacing: '.08em' }}>entrega das chaves</div></div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Em destaque */}
      <section className="wrap" style={{ paddingBottom: 140 }}>
        <SectionTitle
          eyebrow="Em destaque"
          title="Residências disponíveis"
          aside={<Link to="/residencias" className="link-underline-gold">Ver todas as residências</Link>}
        />
        <div className="row g-4 gy-5">
          {destaque.map((r, i) => (
            <Reveal key={r.slug} delay={i * 0.12} className="col-md-6 col-lg-4">
              <ResidenciaCard r={r} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Lugares e paisagens */}
      <section className="surface section">
        <div className="wrap">
          <SectionTitle eyebrow="Lugares e paisagens" title="O terreno escolhe a casa. Nunca o contrário." maxWidth={720} />
          <div className="dest-strip">
            {paisagens.map((d, i) => (
              <Reveal key={d.cidade} delay={i * 0.1}>
                <Link to="/destinos" aria-label={`Destino ${d.cidade}`}>
                  <figure className="dest-tile">
                    <img src={d.imagem} alt={`${d.cidade}: ${d.paisagem}`} loading="lazy" />
                    <figcaption>
                      <span className="serif" style={{ display: 'block', fontSize: 30, color: 'var(--text)' }}>{d.cidade}</span>
                      <span style={{ fontSize: 13, color: 'var(--text-2)' }}>{d.paisagem}</span>
                    </figcaption>
                  </figure>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Galeria */}
      <Gallery eyebrow="Galeria · Casa Horizonte" title="Por dentro, por fora, ao redor." items={horizonte.galeria} />

      {/* O projeto */}
      <section style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap section-sm d-flex flex-wrap align-items-center" style={{ gap: 64 }}>
          <Reveal style={{ flex: '1 1 360px' }}>
            <p className="eyebrow">O projeto</p>
            <h2 className="h-section" style={{ marginBottom: 24 }}>Uma planta desenhada em torno da vista.</h2>
            <p className="body-text" style={{ marginBottom: 32 }}>
              Térreo inteiro aberto para a piscina de 32 metros. Suítes no pavimento suspenso, com vidro eletrocrômico
              que escurece com um toque.
            </p>
            <dl className="dl-grid">
              <div><dt className="small-label">Área construída</dt><dd>1.240 m²</dd></div>
              <div><dt className="small-label">Terreno</dt><dd>8.600 m²</dd></div>
              <div><dt className="small-label">Suítes</dt><dd>6</dd></div>
              <div><dt className="small-label">Vagas</dt><dd>8 + heliponto</dd></div>
            </dl>
            <Link to="/residencias/casa-horizonte" className="btn-line gold-border mt-5">Conhecer a Casa Horizonte</Link>
          </Reveal>
          <Reveal delay={0.15} style={{ flex: '1.4 1 480px', minWidth: 0 }}>
            <img src="/images/casas/casa-horizonte/planta.jpg" alt="Planta do pavimento térreo da Casa Horizonte" style={{ width: '100%', border: '1px solid var(--line)' }} loading="lazy" />
          </Reveal>
        </div>
      </section>

      {/* Tecnologia */}
      <section className="wrap section">
        <SectionTitle eyebrow="Tecnologia invisível" title="A casa ajusta luz, clima e segurança antes de você pedir." />
        <Reveal>
          <div className="tech-grid">
            {tecnologia.map((t) => (
              <SpotlightCard key={t.t}>
                {t.icon}
                <h3 style={{ margin: '20px 0 10px', fontFamily: 'var(--sans)', fontSize: 18, fontWeight: 600 }}>{t.t}</h3>
                <p className="muted mb-0" style={{ fontSize: 15, lineHeight: 1.6 }}>{t.d}</p>
              </SpotlightCard>
            ))}
          </div>
        </Reveal>
      </section>

      <CtaVisita />
    </>
  )
}
