"use client";
import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { a } from "@react-spring/three";
import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

interface GLBModelViewerProps {
  modelPath: string;
  modelTitle?: string;
  className?: string;
  position?: [number, number, number];
  scale?: [number, number, number];
  rotation?: [number, number, number];
}

const GLBModelViewer: React.FC<GLBModelViewerProps> = ({ modelPath, modelTitle, className,...props }) => {
  const { scene } = useGLTF(modelPath);
  const internalHeroSectionRef = useRef<HTMLDivElement>(null);
  const modelGroupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (modelGroupRef.current && internalHeroSectionRef.current) {
        const screenHeight = window.innerHeight;
        const { top } = internalHeroSectionRef.current.getBoundingClientRect();
        const scrollProgress = Math.max(0, Math.min(1, 0.75 - (top / screenHeight)));
        const conceptualScrollY = scrollProgress * (screenHeight);
        const rotationY = (conceptualScrollY / (screenHeight)) * (2 * Math.PI);
        modelGroupRef.current.rotation.y = rotationY;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [internalHeroSectionRef]);

  return (
    <div className='w-full h-screen relative overflow-hidden' ref={internalHeroSectionRef}>
      <section className={`w-full h-screen ${className ? className : 'bg-gradient-to-br from-amber-200 to-amber-800'}`}>
        {modelTitle ? (<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-white text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter drop-shadow-lg'>
          {modelTitle}
        </div>) : null}
        <Canvas
          className='w-full h-screen bg-transparent'
          camera={{
            near: 0.1,
            far: 1000,
          }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight intensity={1.5} position={[1, 1, 1]} />
            <a.group ref={modelGroupRef} {...props} dispose={null}>
              <primitive object={scene} />
            </a.group>
          </Suspense>
        </Canvas>
      </section>
    </div>
  );
};

GLBModelViewer.displayName = 'GLBModelViewer';

export default GLBModelViewer;
