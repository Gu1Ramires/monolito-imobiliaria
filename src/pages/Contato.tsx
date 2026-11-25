import { motion } from 'motion/react'
import { useState, type FormEvent } from 'react'
import Form from 'react-bootstrap/Form'
import { useSearchParams } from 'react-router-dom'
import BlurText from '../components/fx/BlurText'
import Reveal from '../components/fx/Reveal'
import { getResidencia, residencias } from '../data/residencias'
import { CONTATO } from '../data/contato'

export default function Contato() {
  const [params] = useSearchParams()
  const inicial = getResidencia(params.get('residencia') ?? undefined)?.slug ?? residencias[0].slug
  const [validated, setValidated] = useState(false)
  const [sent, setSent] = useState(false)

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (e.currentTarget.checkValidity()) setSent(true)
    setValidated(true)
  }

  return (
    <>
      <section className="wrap page-header d-flex flex-wrap" style={{ gap: 80, paddingBottom: 120 }}>
        <div style={{ flex: '1 1 400px' }}>
          <p className="eyebrow">Concierge</p>
          <BlurText as="h1" text={'Fale com quem\nconhece cada casa.'} className="display display-sm" />
          <Reveal delay={0.3}>
            <p className="lead-text" style={{ margin: '28px 0 56px', maxWidth: 460 }}>
              Atendimento reservado, com resposta em até duas horas. Visitas com traslado aéreo a partir de São Paulo.
            </p>
            <dl className="mb-0">
              <div style={{ padding: '20px 0', borderTop: '1px solid var(--line)' }}>
                <dt className="small-label">Telefone</dt>
                <dd className="serif mb-0" style={{ fontSize: 28, marginTop: 6 }}><a href={CONTATO.telLink}>{CONTATO.telefone}</a></dd>
              </div>
              <div style={{ padding: '20px 0', borderTop: '1px solid var(--line)' }}>
                <dt className="small-label">E-mail</dt>
                <dd className="serif mb-0" style={{ fontSize: 'clamp(22px, 2.4vw, 28px)', marginTop: 6, wordBreak: 'break-all' }}><a href={CONTATO.emailLink}>{CONTATO.email}</a></dd>
              </div>
              <div style={{ padding: '20px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
                <dt className="small-label">Showroom</dt>
                <dd className="mb-0" style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--text-2)', marginTop: 6 }}>{CONTATO.endereco}</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.2} style={{ flex: '1 1 460px' }}>
          <div className="surface" style={{ border: '1px solid var(--line)', padding: 'clamp(28px, 4vw, 48px)' }}>
            {sent ? (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} role="status" style={{ padding: '60px 0' }}>
                <p className="eyebrow">Pedido recebido</p>
                <h2 style={{ fontSize: 44, lineHeight: 1.05 }}>Pedido enviado.<br /><em className="gold">Retornamos em até 2 h.</em></h2>
                <button type="button" className="btn-line gold-border mt-4" onClick={() => { setSent(false); setValidated(false) }}>Enviar outro pedido</button>
              </motion.div>
            ) : (
              <Form noValidate validated={validated} onSubmit={submit} className="d-flex flex-column" style={{ gap: 22 }}>
                <h2 style={{ fontSize: 36, marginBottom: 6 }}>Agendar visita privada</h2>
                <Form.Group controlId="c-nome">
                  <Form.Label>Nome completo</Form.Label>
                  <Form.Control required type="text" placeholder="Seu nome" minLength={3} />
                  <Form.Control.Feedback type="invalid">Informe seu nome completo.</Form.Control.Feedback>
                </Form.Group>
                <div className="d-flex flex-wrap" style={{ gap: 16 }}>
                  <Form.Group controlId="c-email" style={{ flex: '1 1 180px' }}>
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control required type="email" placeholder="voce@email.com" />
                    <Form.Control.Feedback type="invalid">Informe um e-mail válido.</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="c-tel" style={{ flex: '1 1 180px' }}>
                    <Form.Label>WhatsApp</Form.Label>
                    <Form.Control required type="tel" placeholder="(11) 90000-0000" pattern="[\d\s()+-]{10,}" />
                    <Form.Control.Feedback type="invalid">Informe um telefone válido.</Form.Control.Feedback>
                  </Form.Group>
                </div>
                <Form.Group controlId="c-res">
                  <Form.Label>Residência de interesse</Form.Label>
                  <Form.Select defaultValue={inicial}>
                    {residencias.map((r) => (
                      <option key={r.slug} value={r.slug}>{r.nome} · {r.cidade}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group controlId="c-msg">
                  <Form.Label>Mensagem</Form.Label>
                  <Form.Control as="textarea" rows={4} placeholder="Datas preferidas, número de pessoas, traslado" />
                </Form.Group>
                <button type="submit" className="btn-gold" style={{ minHeight: 56, fontSize: 16 }}>Solicitar visita</button>
                <p className="muted mb-0" style={{ fontSize: 13 }}>Seus dados ficam só com o concierge. Sem newsletter.</p>
              </Form>
            )}
          </div>
        </Reveal>
      </section>

      <section aria-label="Showroom" style={{ position: 'relative', height: 420, overflow: 'hidden' }}>
        <img src="/images/casas/casa-horizonte/interior.jpg" alt="Showroom MONOLITO" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(13,12,10,.88), rgba(13,12,10,.1))' }} />
        <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', transform: 'translateY(-50%)' }}>
          <div className="wrap">
            <Reveal>
              <p className="serif mb-0" style={{ fontSize: 'clamp(32px, 4vw, 44px)', maxWidth: 520, lineHeight: 1.1 }}>
                Showroom aberto de terça a sábado, com hora marcada.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
