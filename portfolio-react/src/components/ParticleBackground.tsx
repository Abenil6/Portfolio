import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useThemeStore } from '@/store/useThemeStore';

interface ParticlesProps {
  count: number;
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
}

function Particles({ count, mousePosition }: ParticlesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { viewport } = useThree();
  
  // Store particle data (position, velocity, original position)
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * viewport.width * 2;
      const y = (Math.random() - 0.5) * viewport.height * 2;
      const z = (Math.random() - 0.5) * 50;
      temp.push({
        position: new THREE.Vector3(x, y, z),
        originalPosition: new THREE.Vector3(x, y, z),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.01
        ),
      });
    }
    return temp;
  }, [count, viewport.width, viewport.height]);

  // Set initial positions
  useEffect(() => {
    if (!meshRef.current) return;
    
    const dummy = new THREE.Object3D();
    particles.forEach((particle, i) => {
      dummy.position.copy(particle.position);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [particles]);

  // Animation loop with mouse interaction
  useFrame((state) => {
    if (!meshRef.current) return;

    const dummy = new THREE.Object3D();
    const time = state.clock.getElapsedTime();
    const mouse3D = new THREE.Vector3(
      (mousePosition.current.x * viewport.width) / 2,
      -(mousePosition.current.y * viewport.height) / 2,
      0
    );

    particles.forEach((particle, i) => {
      // Floating animation
      particle.position.x += particle.velocity.x;
      particle.position.y += particle.velocity.y + Math.sin(time + i * 0.1) * 0.001;
      particle.position.z += particle.velocity.z;

      // Boundary wrapping
      const halfWidth = viewport.width;
      const halfHeight = viewport.height;
      
      if (particle.position.x > halfWidth) particle.position.x = -halfWidth;
      if (particle.position.x < -halfWidth) particle.position.x = halfWidth;
      if (particle.position.y > halfHeight) particle.position.y = -halfHeight;
      if (particle.position.y < -halfHeight) particle.position.y = halfHeight;
      if (particle.position.z > 25) particle.position.z = -25;
      if (particle.position.z < -25) particle.position.z = 25;

      // Mouse interaction (repulsion)
      const distance = particle.position.distanceTo(mouse3D);
      const interactionRadius = 5;
      
      if (distance < interactionRadius) {
        const force = (1 - distance / interactionRadius) * 0.15;
        const direction = particle.position.clone().sub(mouse3D).normalize();
        particle.position.add(direction.multiplyScalar(force));
      }

      // Subtle return to original position
      particle.position.lerp(particle.originalPosition, 0.001);

      // Update matrix
      dummy.position.copy(particle.position);
      
      // Scale based on depth (perspective effect)
      const scale = THREE.MathUtils.mapLinear(particle.position.z, -25, 25, 0.3, 1.2);
      dummy.scale.setScalar(scale);
      
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color="#3b82f6" transparent opacity={0.6} />
    </instancedMesh>
  );
}

function ParticleScene() {
  const mousePosition = useRef({ x: 0, y: 0 });
  const particlesEnabled = useThemeStore((state) => state.particlesEnabled);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!particlesEnabled) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 75 }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
      gl={{ antialias: false, alpha: true }}
      dpr={[1, 1.5]} // Limit pixel ratio for performance
    >
      <fog attach="fog" args={['#010409', 10, 30]} />
      <Particles count={1200} mousePosition={mousePosition} />
    </Canvas>
  );
}

export default ParticleScene;
