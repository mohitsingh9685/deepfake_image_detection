import { Suspense, useEffect, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, Float } from "@react-three/drei"
import * as THREE from "three"

type GLTFResult = {
  scene: THREE.Group
}

function Brain() {
  const { scene } = useGLTF("/models/brain.glb") as unknown as GLTFResult
  const brainRef = useRef<THREE.Group>(null!)

  // Apply holographic material once
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        mesh.material = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color("#00f5ff"),
          emissive: new THREE.Color("#00eaff"),
          emissiveIntensity: 1.3,
          roughness: 0.25,
          metalness: 0.2,
          transmission: 0.5,
          transparent: true,
          opacity: 0.9,
        })
      }
    })
  }, [scene])

  useFrame((_, delta) => {
    if (brainRef.current) {
      brainRef.current.rotation.y += delta * 0.25
    }
  })

  return <primitive ref={brainRef} object={scene} scale={2.6} />
}

export function DeepfakeModel() {
  return (
    <div className="w-full h-[600px]">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={2} />

        <Suspense fallback={null}>
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
            <Brain />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  )
}

useGLTF.preload("/models/brain.glb")