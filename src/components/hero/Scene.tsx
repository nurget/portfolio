'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, MeshReflectorMaterial, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { Suspense, useEffect, useMemo, useRef } from 'react';

function SceneBackground() {
  const { scene } = useThree();
  useEffect(() => {
    scene.background = new THREE.Color('#fafafa');
    return () => {
      scene.background = null;
    };
  }, [scene]);
  return null;
}

function HeroModel({ progress }: { progress: number }) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/base_basic_shaded.glb');

  // 캐시된 scene 공유 이슈 방지를 위해 clone
  const model = useMemo(() => scene.clone(true), [scene]);

  // 모델 크기/중심 정규화 (어떤 glb든 중앙 정렬 + 적당한 스케일)
  const normalized = useMemo(() => {
    const box = new THREE.Box3().setFromObject(model);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const maxAxis = Math.max(size.x, size.y, size.z) || 1;
    const scale = 2.1 / maxAxis;

    return { scale, center };
  }, [model]);

  useEffect(() => {
    model.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });
  }, [model]);

  useFrame(({ clock }) => {
    if (!group.current) return;

    const t = clock.getElapsedTime();
    const smooth = (p: number) => p * p * (3 - 2 * p);
    const easeOut = (p: number) => 1 - Math.pow(1 - p, 3);
    const easeIn = (p: number) => p * p * p;
    
    // 3단계 애니메이션: 진입(0~0.35) → 중앙 포즈(0.35~0.65) → 퇴장(0.65~1.0)
    
    // 진입 단계 (왼쪽 멀리서 중앙으로 달려옴)
    const entrancePhase = Math.min(progress / 0.35, 1);
    const entranceEased = easeOut(entrancePhase);
    
    // 중앙 포즈 단계 (천천히 회전하며 멈춤)
    const centerPhase = Math.max(0, Math.min((progress - 0.35) / 0.3, 1));
    
    // 퇴장 단계 (오른쪽으로 부드럽게 이동)
    const exitPhase = Math.max(0, (progress - 0.65) / 0.35);
    const exitEased = easeIn(exitPhase);
    
    // X축: 왼쪽(-6) → 중앙(0) → 오른쪽(6)
    let x = THREE.MathUtils.lerp(-6, 0, entranceEased);
    if (exitPhase > 0) {
      x = THREE.MathUtils.lerp(0, 6, exitEased);
    }
    
    // Z축: 멀리(-5) → 앞쪽(1.2) → 조금 더 앞쪽(1.8)
    let z = THREE.MathUtils.lerp(-5, 1.2, entranceEased);
    if (exitPhase > 0) {
      z = THREE.MathUtils.lerp(1.2, 1.8, exitEased);
    }
    
    // Y축 회전: 왼쪽을 보며 진입 → 정면 → 오른쪽을 보며 퇴장
    let rotY = THREE.MathUtils.lerp(0.6, 0, entranceEased);
    if (centerPhase > 0) {
      rotY = THREE.MathUtils.lerp(0, -0.15, smooth(centerPhase));
    }
    if (exitPhase > 0) {
      rotY = THREE.MathUtils.lerp(-0.15, -0.7, exitEased);
    }
    
    // X축 회전: 약간의 다이나믹함
    const rotX = THREE.MathUtils.lerp(-0.08, 0.03, smooth(progress));
    
    // 진입 단계에서는 속도감 있는 움직임, 중앙에서는 부드러운 idle 모션
    const idleIntensity = centerPhase > 0 ? Math.min(centerPhase * 2, 1) : 0;
    const speedWobble = entrancePhase < 1 ? Math.sin(t * 4) * 0.04 * (1 - entrancePhase) : 0;

    group.current.position.x = x + speedWobble;
    group.current.position.z = z;
    group.current.rotation.y = rotY + Math.sin(t * 0.5) * 0.03 * idleIntensity;
    group.current.rotation.x = rotX + Math.sin(t * 0.7) * 0.015 * idleIntensity;
    group.current.position.y = 0.35 + Math.sin(t * 0.8) * 0.03 * idleIntensity;
  });

  return (
    <group ref={group}>
      <primitive
        object={model}
        scale={normalized.scale}
        position={[
          -normalized.center.x * normalized.scale,
          -normalized.center.y * normalized.scale,
          -normalized.center.z * normalized.scale,
        ]}
      />
    </group>
  );
}

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
      <planeGeometry args={[30, 30]} />
      <MeshReflectorMaterial
        blur={[300, 100]}
        resolution={1024}
        mixBlur={1}
        mixStrength={18}
        roughness={0.75}
        depthScale={1.0}
        minDepthThreshold={0.85}
        color="#fafafa"
        metalness={0.0}
      />
    </mesh>
  );
}

function DynamicCamera({ progress }: { progress: number }) {
  const { camera } = useThree();
  
  useFrame(() => {
    // 카메라도 자동차를 따라가며 약간의 움직임
    const smooth = (p: number) => p * p * (3 - 2 * p);
    const p = smooth(progress);
    
    // 초반에는 약간 왼쪽에서, 중반에는 정중앙, 후반에는 약간 오른쪽
    const camX = THREE.MathUtils.lerp(-0.5, 0.8, p);
    const camY = THREE.MathUtils.lerp(1.5, 1.2, p);
    const camZ = THREE.MathUtils.lerp(5.2, 4.0, Math.min(p * 1.5, 1));
    
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, camX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, camY, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, camZ, 0.05);
    
    camera.lookAt(0, 0.5, 0);
  });
  
  return null;
}

export default function Scene({ progress }: { progress: number }) {
  return (
    <Canvas
      shadows
      camera={{ position: [-0.5, 1.5, 5.2], fov: 42 }}
      dpr={[1, 2]}
      gl={{ alpha: false }}
    >
      <SceneBackground />
      <DynamicCamera progress={progress} />
      
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[4, 6, 3]}
        intensity={1.1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <directionalLight position={[-4, 2, -2]} intensity={0.35} />

      <Ground />
      <Suspense fallback={null}>
        <HeroModel progress={progress} />
      </Suspense>

      {/* 밝은 미니멀에서 HDRI 한 장이 퀄을 살림 */}
      <Environment preset="city" />
    </Canvas>
  );
}

useGLTF.preload('/models/base_basic_shaded.glb');
