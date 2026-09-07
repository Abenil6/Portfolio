import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// Individual floating shape component
function FloatingShape({ 
  geometry, 
  position, 
  rotationSpeed, 
  floatSpeed, 
  color, 
  emissiveIntensity = 0.3 
}: {
  geometry: "icosahedron" | "torus" | "sphere";
  position: [number, number, number];
  rotationSpeed: [number, number, number];
  floatSpeed: number;
  color: string;
  emissiveIntensity?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  // Get mouse position from the scene
  const { pointer } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;

    // Smooth mouse tracking for parallax
    mousePosition.current.x += (pointer.x - mousePosition.current.x) * 0.05;
    mousePosition.current.y += (pointer.y - mousePosition.current.y) * 0.05;

    // Apply parallax offset based on mouse position
    const parallaxX = mousePosition.current.x * 0.5;
    const parallaxY = mousePosition.current.y * 0.5;

    // Continuous rotation
    meshRef.current.rotation.x += rotationSpeed[0];
    meshRef.current.rotation.y += rotationSpeed[1];
    meshRef.current.rotation.z += rotationSpeed[2];

    // Apply floating animation with parallax
    const time = state.clock.getElapsedTime();
    meshRef.current.position.x = position[0] + Math.sin(time * floatSpeed) * 0.3 + parallaxX;
    meshRef.current.position.y = position[1] + Math.cos(time * floatSpeed * 0.7) * 0.3 + parallaxY;
  });

  const renderGeometry = () => {
    switch (geometry) {
      case "icosahedron":
        return <icosahedronGeometry args={[1, 0]} />;
      case "torus":
        return <torusGeometry args={[1, 0.4, 16, 100]} />;
      case "sphere":
        return <sphereGeometry args={[1, 32, 32]} />;
    }
  };

  return (
    <Float speed={floatSpeed} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        {renderGeometry()}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={emissiveIntensity}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.9}
        />
      </mesh>
    </Float>
  );
}

// Scene composition with all shapes
function Scene() {
  // Define shapes with their properties
  const shapes = useMemo(
    () => [
      {
        geometry: "icosahedron" as const,
        position: [-4, 2, 0] as [number, number, number],
        rotationSpeed: [0.005, 0.008, 0.003] as [number, number, number],
        floatSpeed: 0.8,
        color: "#3b82f6", // blue-500
        emissiveIntensity: 0.4,
      },
      {
        geometry: "torus" as const,
        position: [3, -1, -2] as [number, number, number],
        rotationSpeed: [0.003, 0.006, 0.004] as [number, number, number],
        floatSpeed: 1.2,
        color: "#6366f1", // indigo-500
        emissiveIntensity: 0.3,
      },
      {
        geometry: "sphere" as const,
        position: [0, 3, -3] as [number, number, number],
        rotationSpeed: [0.002, 0.005, 0.002] as [number, number, number],
        floatSpeed: 0.6,
        color: "#1e40af", // blue-800
        emissiveIntensity: 0.35,
      },
      {
        geometry: "icosahedron" as const,
        position: [5, 1, -1] as [number, number, number],
        rotationSpeed: [0.006, 0.004, 0.005] as [number, number, number],
        floatSpeed: 1.0,
        color: "#4f46e5", // indigo-600
        emissiveIntensity: 0.3,
      },
      {
        geometry: "sphere" as const,
        position: [-3, -2, -1] as [number, number, number],
        rotationSpeed: [0.004, 0.007, 0.003] as [number, number, number],
        floatSpeed: 0.9,
        color: "#2563eb", // blue-600
        emissiveIntensity: 0.25,
      },
    ],
    []
  );

  return (
    <>
      {/* Ambient light for overall scene illumination */}
      <ambientLight intensity={0.3} />

      {/* Point lights matching the blue/indigo theme */}
      <pointLight position={[-5, 5, 5]} intensity={1.5} color="#3b82f6" />
      <pointLight position={[5, -5, -5]} intensity={1.2} color="#6366f1" />
      <pointLight position={[0, 0, 5]} intensity={0.8} color="#1e40af" />

      {/* Render all floating shapes */}
      {shapes.map((shape, index) => (
        <FloatingShape key={index} {...shape} />
      ))}

      {/* Camera setup */}
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
    </>
  );
}

// Main component with performance optimization
export default function Hero3DScene() {
  // Detect if device is low-end (basic check)
  const isLowEndDevice = useMemo(() => {
    if (typeof window === "undefined") return false;
    
    // Check for mobile devices or low DPR
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    const hasLowDPR = window.devicePixelRatio < 1.5;
    
    return isMobile || hasLowDPR;
  }, []);

  // Don't render 3D scene on low-end devices
  if (isLowEndDevice) {
    return null;
  }

  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        dpr={[1, 2]} // Limit pixel ratio for performance
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
