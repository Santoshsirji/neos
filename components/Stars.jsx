"use client";
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const StarField = ({
  count = 5000,
  radius = 100,
  depth = 50,
  size = 0.1,
  speed = 0.01
}) => {
  const pointsRef = useRef();
  
  // Create star vertices and blinking parameters
  const [starPositions, starBlinkData] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const blinkData = new Float32Array(count * 4); // [speed, offset, min brightness, max brightness]
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const i4 = i * 4;
      
      // Position
      const r = radius + Math.random() * depth;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i3] = r * Math.cos(theta) * Math.sin(phi);     // x
      positions[i3 + 1] = r * Math.sin(theta) * Math.sin(phi); // y
      positions[i3 + 2] = r * Math.cos(phi);                   // z
      
      // Base color (slightly randomized)
      const baseColor = 0.7 + Math.random() * 0.3;
      colors[i3] = baseColor;
      colors[i3 + 1] = baseColor;
      colors[i3 + 2] = baseColor;
      
      // Blinking parameters
      blinkData[i4] = 0.1 + Math.random() * 0.5;           // Random speed
      blinkData[i4 + 1] = Math.random() * 2 * Math.PI;     // Random offset
      blinkData[i4 + 2] = Math.random() * 0.5;             // Minimum brightness
      blinkData[i4 + 3] = 0.5 + Math.random() * 0.5;       // Maximum brightness
    }
    
    return [
      { positions, colors },
      blinkData
    ];
  }, [count, radius, depth]);
  
  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += speed * delta;
      
      const time = state.clock.getElapsedTime();
      const colors = pointsRef.current.geometry.attributes.color.array;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const i4 = i * 4;
        
        // Calculate brightness using sin wave with unique parameters for each star
        const brightness = THREE.MathUtils.lerp(
          starBlinkData[i4 + 2], // min brightness
          starBlinkData[i4 + 3], // max brightness
          (Math.sin(time * starBlinkData[i4] + starBlinkData[i4 + 1]) + 1) / 2
        );
        
        colors[i3] = brightness;
        colors[i3 + 1] = brightness;
        colors[i3 + 2] = brightness;
      }
      
      pointsRef.current.geometry.attributes.color.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={starPositions.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={starPositions.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        sizeAttenuation={true}
        vertexColors={true}
        transparent={true}
        alphaTest={0.001}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default StarField;