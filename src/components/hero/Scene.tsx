import { ContactShadows, Stars } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { memo, useEffect, useMemo, useRef, type RefObject } from 'react'
import * as THREE from 'three'
import HouseModel, { stages } from './HouseModel'

/** Céu de entardecer como textura de gradiente (sem baixar HDR). */
function useSkyTexture() {
  return useMemo(() => {
    const c = document.createElement('canvas')
    c.width = 8
    c.height = 512
    const g = c.getContext('2d')!
    const grd = g.createLinearGradient(0, 0, 0, 512)
    grd.addColorStop(0, '#060709')
    grd.addColorStop(0.42, '#121319')
    grd.addColorStop(0.62, '#3a2a1e')
    grd.addColorStop(0.72, '#8a5a34')
    grd.addColorStop(0.78, '#1a1512')
    grd.addColorStop(1, '#0a0a0a')
    g.fillStyle = grd
    g.fillRect(0, 0, 8, 512)
    const t = new THREE.CanvasTexture(c)
    t.colorSpace = THREE.SRGBColorSpace
    return t
  }, [])
}

function Atmosphere({ progress }: { progress: RefObject<number> }) {
  const { scene } = useThree()
  const sky = useSkyTexture()
  const sun = useRef<THREE.DirectionalLight>(null)
  const fogColor = useMemo(() => new THREE.Color(), [])
  const night = useMemo(() => new THREE.Color('#0b0b0d'), [])
  const dusk = useMemo(() => new THREE.Color('#1d1510'), [])

  useEffect(() => {
    scene.background = sky
    scene.fog = new THREE.Fog('#0b0b0d', 22, 60)
    return () => {
      scene.background = null
      scene.fog = null
    }
  }, [scene, sky])

  useFrame(() => {
    const { s3, s4 } = stages(progress.current ?? 0)
    if (scene.fog) (scene.fog as THREE.Fog).color.copy(fogColor.copy(night).lerp(dusk, s4))
    if (sun.current) sun.current.intensity = 0.6 + s3 * 0.9
  })

  return (
    <>
      <ambientLight intensity={0.22} />
      <hemisphereLight args={['#3a3f52', '#0b0b0b', 0.45]} />
      <directionalLight ref={sun} position={[14, 7, 9]} color="#ffb877" intensity={0.6} />
      <directionalLight position={[-12, 5, -10]} color="#6b7a99" intensity={0.25} />
      <Stars radius={70} depth={30} count={1200} factor={2.2} saturation={0} fade speed={0.4} />
    </>
  )
}

/** Câmera orbita a casa conforme o scroll, com leve parallax do mouse. */
function CameraRig({ progress, smooth }: { progress: RefObject<number>; smooth: RefObject<number> }) {
  const mouse = useRef({ x: 0, y: 0 })
  const target = useMemo(() => new THREE.Vector3(0.6, 2, 0), [])

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useFrame((state, dt) => {
    const k = 1 - Math.exp(-dt * 4)
    smooth.current = THREE.MathUtils.lerp(smooth.current ?? 0, progress.current ?? 0, k)
    const p = smooth.current
    const narrow = state.size.width < 768
    const angle = -0.6 + p * 1.4 + mouse.current.x * 0.06
    const radius = (narrow ? 32 : 19) - p * 2.5
    const height = 5.6 - p * 2.1 - mouse.current.y * 0.25
    const cam = state.camera as THREE.PerspectiveCamera
    // desloca a casa para a direita da tela no desktop (o texto fica à esquerda)
    const { width: w, height: h } = state.size
    const shift = narrow ? 0 : -w * 0.17
    if (cam.view?.offsetX !== shift || cam.view?.fullWidth !== w || cam.view?.fullHeight !== h) {
      cam.setViewOffset(w, h, shift, 0, w, h)
    }
    cam.position.x = THREE.MathUtils.lerp(cam.position.x, Math.sin(angle) * radius, k * 2)
    cam.position.z = THREE.MathUtils.lerp(cam.position.z, Math.cos(angle) * radius, k * 2)
    cam.position.y = THREE.MathUtils.lerp(cam.position.y, height, k * 2)
    cam.lookAt(target)
  })
  return null
}

function SceneInner({ progress }: { progress: RefObject<number> }) {
  const smooth = useRef(0)
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      camera={{ fov: 34, position: [-9, 5.6, 14], near: 0.1, far: 200 }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping
        gl.toneMappingExposure = 1.15
      }}
      aria-label="Modelo 3D da Casa Horizonte sendo construída conforme a rolagem"
    >
      <Atmosphere progress={smooth} />
      <CameraRig progress={progress} smooth={smooth} />
      <HouseModel progress={smooth} />
      <ContactShadows position={[0, 0.005, 0]} opacity={0.65} scale={40} blur={2.4} far={8} resolution={512} color="#000000" />
    </Canvas>
  )
}

/** memo: o canvas não re-renderiza quando o overlay muda. */
const Scene = memo(SceneInner)
export default Scene
