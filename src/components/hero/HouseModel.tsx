import { useFrame } from '@react-three/fiber'
import { useMemo, useRef, type RefObject } from 'react'
import * as THREE from 'three'

/* ------------------------------------------------------------------ */
/*  Etapas da obra a partir do progresso (0 → 1)                       */
/* ------------------------------------------------------------------ */
const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
export const stages = (p: number) => ({
  s1: easeInOut(clamp01(p / 0.25)), // fundação
  s2: clamp01((p - 0.25) / 0.25), // estrutura (wireframe)
  s3: easeInOut(clamp01((p - 0.5) / 0.25)), // fachada de vidro / materiais
  s4: easeInOut(clamp01((p - 0.75) / 0.25)), // pronta para viver (luzes)
})

type Kind = 'found' | 'struct' | 'glass' | 'light' | 'water'

interface BlockProps {
  progress: RefObject<number>
  size: [number, number, number]
  /** posição da BASE do bloco (y = chão do bloco) */
  pos: [number, number, number]
  color?: string
  kind: Kind
  /** atraso dentro da etapa (0–0.6) */
  delay?: number
}

const GOLD = new THREE.Color('#C2A06B')
const WARM = new THREE.Color('#F2C88C')
const TEAL = new THREE.Color('#3fa7b3')

function Block({ progress, size, pos, color = '#1B1A18', kind, delay = 0 }: BlockProps) {
  const group = useRef<THREE.Group>(null)
  const mat = useRef<THREE.MeshStandardMaterial | THREE.MeshPhysicalMaterial>(null)
  const line = useRef<THREE.LineBasicMaterial>(null)
  const ghost = useRef<THREE.LineBasicMaterial>(null)
  const inner = useRef<THREE.Group>(null)

  const [geo, edges] = useMemo(() => {
    const g = new THREE.BoxGeometry(...size)
    g.translate(0, size[1] / 2, 0) // origem na base, para "crescer" de baixo para cima
    return [g, new THREE.EdgesGeometry(g)]
  }, [size])

  useFrame(() => {
    const { s1, s2, s3, s4 } = stages(progress.current ?? 0)
    const g = group.current
    const m = mat.current
    const l = line.current
    const gh = ghost.current
    const inn = inner.current
    if (!g || !m || !l || !gh || !inn) return

    let solid = 0
    let wire = 0
    let scaleY = 1
    let offsetY = 0
    let built = 1

    if (kind === 'found') {
      offsetY = (1 - s1) * -2.2
      solid = s1
      wire = s1 * (1 - s3) * 0.6
      built = s1
    } else if (kind === 'water') {
      offsetY = (1 - s1) * -2.2
      solid = s1
      m.emissive.copy(TEAL)
      m.emissiveIntensity = 0.15 + s4 * 0.9
    } else if (kind === 'struct') {
      const local = clamp01((s2 - delay) / (1 - delay))
      scaleY = Math.max(0.001, easeInOut(local))
      wire = local * (1 - s3 * 0.92)
      solid = s3
      built = local
    } else if (kind === 'glass') {
      const local = clamp01((s2 - delay) / (1 - delay))
      scaleY = Math.max(0.001, easeInOut(local))
      wire = local * (1 - s3 * 0.7)
      solid = s3 * 0.38
      built = local
    } else if (kind === 'light') {
      solid = s3 * (0.25 + s4 * 0.75)
      m.emissive.copy(WARM)
      m.emissiveIntensity = 0.12 + s4 * 1.05
    }

    inn.scale.y = scaleY
    inn.position.y = offsetY
    g.position.y = pos[1]
    // "planta fantasma": contorno dourado fraco da casa inteira antes de ser construída
    const gOp = kind === 'light' || kind === 'water' ? 0 : 0.28 * (1 - built)
    gh.opacity = gOp
    gh.visible = gOp > 0.002
    m.opacity = solid
    m.transparent = solid < 0.999
    m.depthWrite = solid > 0.5
    m.visible = solid > 0.002
    l.opacity = wire
    l.visible = wire > 0.002
  })

  return (
    <group ref={group} position={pos}>
      <lineSegments geometry={edges}>
        <lineBasicMaterial ref={ghost} color={GOLD} transparent opacity={0} depthWrite={false} />
      </lineSegments>
      <group ref={inner}>
      <mesh geometry={geo} castShadow receiveShadow>
        {kind === 'glass' ? (
          <meshPhysicalMaterial ref={mat as RefObject<THREE.MeshPhysicalMaterial>} color="#55626a" roughness={0.04} metalness={0.35} transparent opacity={0} />
        ) : (
          <meshStandardMaterial ref={mat as RefObject<THREE.MeshStandardMaterial>} color={color} roughness={kind === 'water' ? 0.15 : 0.85} metalness={kind === 'water' ? 0.3 : 0.05} transparent opacity={0} />
        )}
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial ref={line} color={GOLD} transparent opacity={0} />
      </lineSegments>
      </group>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/*  Árvore estilizada                                                   */
/* ------------------------------------------------------------------ */
function Tree({ progress, pos, s = 1 }: { progress: RefObject<number>; pos: [number, number, number]; s?: number }) {
  const ref = useRef<THREE.Group>(null)
  useFrame(() => {
    const { s1 } = stages(progress.current ?? 0)
    if (ref.current) ref.current.scale.setScalar(Math.max(0.001, s1 * s))
  })
  return (
    <group ref={ref} position={pos}>
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 1.8, 6]} />
        <meshStandardMaterial color="#1a1612" roughness={1} />
      </mesh>
      <mesh position={[0, 2.4, 0]}>
        <icosahedronGeometry args={[1.1, 0]} />
        <meshStandardMaterial color="#121a14" roughness={1} flatShading />
      </mesh>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/*  A casa                                                              */
/* ------------------------------------------------------------------ */
export default function HouseModel({ progress }: { progress: RefObject<number> }) {
  const lowerLight = useRef<THREE.PointLight>(null)
  const upperLight = useRef<THREE.PointLight>(null)
  const poolLight = useRef<THREE.PointLight>(null)

  useFrame(() => {
    const { s4 } = stages(progress.current ?? 0)
    if (lowerLight.current) lowerLight.current.intensity = s4 * 26
    if (upperLight.current) upperLight.current.intensity = s4 * 18
    if (poolLight.current) poolLight.current.intensity = s4 * 6
  })

  const P = progress
  return (
    <group position={[-0.8, 0, 0]}>
      {/* chão */}
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.01, 0]} receiveShadow>
        <circleGeometry args={[40, 48]} />
        <meshStandardMaterial color="#0d0c0b" roughness={1} />
      </mesh>

      {/* 01 · fundação */}
      <Block progress={P} kind="found" size={[15, 0.22, 9]} pos={[0.6, 0, 0]} color="#2E2A25" />
      <Block progress={P} kind="water" size={[10, 0.08, 2.4]} pos={[-0.6, 0.22, 3.1]} color="#10262c" />
      <Block progress={P} kind="found" size={[11, 0.3, 0.25]} pos={[-0.6, 0, 4.42]} color="#3a352e" />

      {/* 02 · estrutura (wireframe) → 03 · materiais */}
      {/* volume térreo */}
      <Block progress={P} kind="struct" size={[9, 2.6, 5]} pos={[-1.6, 0.22, -0.8]} color="#161512" delay={0} />
      {/* laje intermediária */}
      <Block progress={P} kind="struct" size={[11.4, 0.2, 6]} pos={[1.2, 2.82, -0.9]} color="#34302A" delay={0.25} />
      {/* volume superior em balanço */}
      <Block progress={P} kind="struct" size={[7.6, 2.1, 5.4]} pos={[0.4, 3.02, -0.9]} color="#1B1A18" delay={0.35} />
      {/* bloco de travertino */}
      <Block progress={P} kind="struct" size={[3, 2.1, 5.4]} pos={[5.7, 3.02, -0.9]} color="#4A4238" delay={0.45} />
      {/* cobertura */}
      <Block progress={P} kind="struct" size={[11.8, 0.18, 6.4]} pos={[1.2, 5.12, -0.9]} color="#2A2826" delay={0.55} />
      {/* pilares sob o balanço */}
      <Block progress={P} kind="struct" size={[0.14, 2.6, 0.14]} pos={[4.6, 0.22, 1.7]} color="#26231F" delay={0.1} />
      <Block progress={P} kind="struct" size={[0.14, 2.6, 0.14]} pos={[6.6, 0.22, 1.7]} color="#26231F" delay={0.15} />
      <Block progress={P} kind="struct" size={[0.14, 2.6, 0.14]} pos={[6.6, 0.22, -3.4]} color="#26231F" delay={0.2} />

      {/* vidros (frente) */}
      <Block progress={P} kind="glass" size={[8.4, 2.2, 0.06]} pos={[-1.6, 0.4, 1.76]} delay={0.2} />
      <Block progress={P} kind="glass" size={[7, 1.7, 0.06]} pos={[0.4, 3.22, 1.86]} delay={0.5} />

      {/* 04 · luz interna (planos emissivos logo atrás do vidro) */}
      <Block progress={P} kind="light" size={[8.2, 2.1, 0.02]} pos={[-1.6, 0.42, 1.715]} color="#3a2414" />
      <Block progress={P} kind="light" size={[6.8, 1.6, 0.02]} pos={[0.4, 3.26, 1.815]} color="#3a2414" />

      <pointLight ref={lowerLight} position={[-1.6, 1.6, 3]} color="#F2C88C" distance={12} decay={2} intensity={0} />
      <pointLight ref={upperLight} position={[0.4, 4, 3.2]} color="#F2C88C" distance={10} decay={2} intensity={0} />
      <pointLight ref={poolLight} position={[-0.6, 0.6, 3.1]} color="#58c4cf" distance={6} decay={2} intensity={0} />

      {/* paisagismo */}
      <Tree progress={P} pos={[-9.2, 0, -2]} s={1.1} />
      <Tree progress={P} pos={[-10.6, 0, 1.2]} s={0.8} />
      <Tree progress={P} pos={[-8, 0, -5]} s={1.3} />
      <Tree progress={P} pos={[10, 0, -4]} s={1.2} />
      <Tree progress={P} pos={[11.2, 0, 0.6]} s={0.9} />
    </group>
  )
}
