import React, { useMemo, useRef } from 'react';
import { Points } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const DustParticles = () => {
  const numParticles = 9000;
  const pointsRef = useRef();

  const AU = 1; // Define the Astronomical Unit for scaling
  const minAU = 1.52; // Mars orbit
  const maxAU = 5.20; // Jupiter orbit
  const innerRadius = minAU * AU;
  const outerRadius = maxAU * AU;

  const totalParticles = numParticles;
  const asteroidBeltParticles = Math.floor(totalParticles * 0.4); // 40% of the particles
  const remainingParticles = totalParticles - asteroidBeltParticles;

  const particleData = useMemo(() => {
    const positions = new Float32Array(numParticles * 3);

    // Function to generate a random point in a spherical shell (for dust particles)
    const generateRandomPosition = (rMin, rMax) => {
      const r = rMin + Math.random() * (rMax - rMin); // Random distance between rMin and rMax
      const theta = Math.random() * Math.PI * 2; // Random angle around the Y-axis
      const phi = Math.random() * Math.PI; // Random angle from the YZ plane

      // Convert spherical coordinates to Cartesian
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      return { x, y, z };
    };

    // Generate asteroid belt particles (concentrated between Mars and Jupiter)
    for (let i = 0; i < asteroidBeltParticles; i++) {
      const { x, y, z } = generateRandomPosition(innerRadius, outerRadius);
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }

    // Generate the remaining dust particles (random throughout the scene)
    for (let i = asteroidBeltParticles; i < totalParticles; i++) {
      const r = Math.random() * 500; // Spread the rest out in a larger area, radius 50
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }

    return positions;
  }, [numParticles]);

  const particleMaterial = new THREE.PointsMaterial({
    color: 0x0000F00FFFFFF,
    size: 0.05,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true,
  });

  // Animate opacity to create a twinkling effect
  useFrame(() => {
    if (pointsRef.current) {
      const material = pointsRef.current.material;
      material.opacity = 0.7 + Math.sin(Date.now() * 0.001) * 0.3; // Change opacity with time
    }
  });

  return (
    <Points ref={pointsRef} positions={particleData} material={particleMaterial}>
      {/* No geometry needed since it's a points cloud */}
    </Points>
  );
};

export default DustParticles;
