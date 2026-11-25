import { useState, type FormEvent } from 'react'
import Form from 'react-bootstrap/Form'
import Reveal from './fx/Reveal'

export default function CtaVisita() {
  const [validated, setValidated] = useState(false)
  const [sent, setSent] = useState(false)

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity()) setSent(true)
    setValidated(true)
  }

  return (
    <section className="cta-image">
      <img src="/images/casas/pavilhao-serra/interior.jpg" alt="" aria-hidden="true" />
      <div className="wrap section d-flex flex-wrap align-items-end justify-content-between" style={{ gap: 48 }}>
        <Reveal style={{ maxWidth: 560 }}>
          <h2 style={{ fontSize: 'clamp(44px, 5vw, 72px)', lineHeight: 1, marginBottom: 16 }}>Visite antes de todo mundo.</h2>
          <p className="body-text mb-0">Visitas privadas, com traslado aéreo a partir de São Paulo.</p>
        </Reveal>
        <Reveal delay={0.15} style={{ flex: '0 1 560px' }}>
          {sent ? (
            <p className="serif gold mb-0" style={{ fontSize: 30 }} role="status">Recebemos seu pedido. Retornamos em até 2 h.</p>
          ) : (
            <Form noValidate validated={validated} onSubmit={submit} className="d-flex flex-wrap" style={{ gap: 12 }}>
              <Form.Group controlId="cta-nome" style={{ flex: '1 1 200px' }}>
                <Form.Label>Nome</Form.Label>
                <Form.Control required type="text" placeholder="Seu nome" className="on-image" />
                <Form.Control.Feedback type="invalid">Informe seu nome.</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="cta-tel" style={{ flex: '1 1 200px' }}>
                <Form.Label>WhatsApp</Form.Label>
                <Form.Control required type="tel" placeholder="(11) 90000-0000" pattern="[\d\s()+-]{10,}" className="on-image" />
                <Form.Control.Feedback type="invalid">Informe um telefone válido.</Form.Control.Feedback>
              </Form.Group>
              <button type="submit" className="btn-gold" style={{ alignSelf: 'flex-start', marginTop: 29 }}>Quero visitar</button>
            </Form>
          )}
        </Reveal>
      </div>
    </section>
  )
}
