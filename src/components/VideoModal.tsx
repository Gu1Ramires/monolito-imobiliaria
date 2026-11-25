import Modal from 'react-bootstrap/Modal'
import { useVideoAvailable } from '../hooks/useVideoAvailable'

interface Props {
  show: boolean
  onHide: () => void
  src: string
  poster: string
  title: string
}

export default function VideoModal({ show, onHide, src, poster, title }: Props) {
  const available = useVideoAvailable(src)
  return (
    <Modal show={show} onHide={onHide} centered size="xl" aria-label={title}>
      <Modal.Header closeButton closeVariant="white" style={{ borderColor: 'var(--line)' }}>
        <Modal.Title as="h2" className="serif" style={{ fontSize: 28 }}>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        {available ? (
          <video src={src} poster={poster} controls autoPlay playsInline style={{ width: '100%', display: 'block', background: '#000' }} />
        ) : (
          <div style={{ position: 'relative' }}>
            <img src={poster} alt="" style={{ width: '100%', maxHeight: '70vh', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(13,12,10,.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center' }}>
              <p className="serif mb-0" style={{ fontSize: 30, maxWidth: 520 }}>
                O filme desta residência é exibido na visita privada.
              </p>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  )
}
