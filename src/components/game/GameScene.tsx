import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useGameStore } from '@/stores/gameStore';
import { DIFFICULTY_CONFIGS } from '@/types/game';

// Doll component (simplified geometric version)
function Doll({ isGreenLight }: { isGreenLight: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef(0);

  useEffect(() => {
    targetRotation.current = isGreenLight ? Math.PI : 0;
  }, [isGreenLight]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotation.current,
        0.08
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -2]}>
      {/* Body */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.3, 0.4, 1, 32]} />
        <meshStandardMaterial color="#FF6B35" />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.3, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial color="#FFECD2" />
      </mesh>
      {/* Hair */}
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.3, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#2D2D2D" />
      </mesh>
      {/* Pigtails */}
      <mesh position={[-0.4, 1.4, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#2D2D2D" />
      </mesh>
      <mesh position={[0.4, 1.4, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#2D2D2D" />
      </mesh>
      {/* Eyes (visible when facing forward) */}
      <mesh position={[-0.12, 1.35, 0.3]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <mesh position={[0.12, 1.35, 0.3]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#000" />
      </mesh>
    </group>
  );
}

// Player sphere component
function PlayerSphere({ player, index }: { player: any; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { isGreenLight, eliminatePlayer, markPlayerSafe, settings } = useGameStore();
  const config = DIFFICULTY_CONFIGS[settings.difficulty];

  useFrame(() => {
    if (!meshRef.current || !player.isAlive || player.isSafe) return;

    // Move player
    const newPosition = meshRef.current.position.x - player.velocity;
    meshRef.current.position.x = newPosition;

    // Check if reached finish line
    if (newPosition <= -5.5) {
      markPlayerSafe(player.id);
    }

    // Check if caught moving during red light
    if (!isGreenLight && player.velocity > 0) {
      setTimeout(() => {
        if (!isGreenLight && player.velocity > 0) {
          eliminatePlayer(player.id);
        }
      }, config.detectionDelay);
    }
  });

  const yOffset = (index - 0.5) * 0.8;

  return (
    <mesh
      ref={meshRef}
      position={[5.5, 0.3 + yOffset, 1]}
    >
      <sphereGeometry args={[0.25, 32, 32]} />
      <meshStandardMaterial
        color={player.isAlive ? player.color : '#666'}
        emissive={player.isAlive ? player.color : '#000'}
        emissiveIntensity={player.isAlive ? 0.3 : 0}
      />
    </mesh>
  );
}

// Runway/Track component
function Runway() {
  return (
    <group>
      {/* Main track */}
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 3]} />
        <meshStandardMaterial color="#2A2A4A" />
      </mesh>
      {/* Start line */}
      <mesh position={[5.5, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.2, 3]} />
        <meshStandardMaterial color="#00BFA6" emissive="#00BFA6" emissiveIntensity={0.5} />
      </mesh>
      {/* Finish line */}
      <mesh position={[-5.5, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.2, 3]} />
        <meshStandardMaterial color="#ED1B76" emissive="#ED1B76" emissiveIntensity={0.5} />
      </mesh>
      {/* Side walls */}
      <mesh position={[0, 0.75, 1.6]}>
        <boxGeometry args={[14, 1.5, 0.2]} />
        <meshStandardMaterial color="#FFD93D" />
      </mesh>
      <mesh position={[0, 0.75, -1.6]}>
        <boxGeometry args={[14, 1.5, 0.2]} />
        <meshStandardMaterial color="#FFD93D" />
      </mesh>
    </group>
  );
}

// Progress bar in 3D
function ProgressBar3D({ progress }: { progress: number }) {
  return (
    <group position={[0, 2.5, 0]}>
      {/* Background */}
      <mesh>
        <boxGeometry args={[10, 0.15, 0.3]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      {/* Progress */}
      <mesh position={[(progress - 1) * 5, 0, 0.1]} scale={[progress, 1, 1]}>
        <boxGeometry args={[10, 0.15, 0.15]} />
        <meshStandardMaterial 
          color={progress > 0.3 ? '#FFD93D' : '#ED1B76'} 
          emissive={progress > 0.3 ? '#FFD93D' : '#ED1B76'}
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
}

// Main Game Scene
export function GameScene() {
  const { gameState, isGreenLight, players, timeRemaining, settings } = useGameStore();
  const config = DIFFICULTY_CONFIGS[settings.difficulty];
  const progress = timeRemaining / config.timeLimit;

  return (
    <Canvas className="w-full h-full">
      <PerspectiveCamera makeDefault position={[0, 4, 8]} fov={60} />
      <OrbitControls 
        enablePan={false} 
        enableZoom={false} 
        minPolarAngle={Math.PI / 4} 
        maxPolarAngle={Math.PI / 2.5}
      />
      
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
      <pointLight position={[0, 5, 0]} intensity={0.5} color={isGreenLight ? '#00BFA6' : '#ED1B76'} />
      
      {/* Background color based on light state */}
      <color attach="background" args={[isGreenLight ? '#1a3a2e' : '#3a1a2e']} />
      
      {/* Game elements */}
      <Runway />
      <Doll isGreenLight={isGreenLight} />
      
      {/* Players */}
      {players.map((player, index) => (
        <PlayerSphere key={player.id} player={player} index={index} />
      ))}
      
      {/* Progress bar */}
      {gameState === 'playing' && <ProgressBar3D progress={progress} />}
    </Canvas>
  );
}
