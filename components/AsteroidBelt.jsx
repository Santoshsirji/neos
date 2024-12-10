import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const AsteroidBelt = () => {
  const asteroidCount = 2000;
  const minRadius = 2.5; // Mars orbit (simplified)
  const maxRadius = 4.2; // Jupiter orbit (simplified)
  const asteroidField = useRef();

  // Generate random asteroids
  const asteroids = useMemo(() => {
    const tempAsteroids = [];
    for (let i = 0; i < asteroidCount; i++) {
      // Random orbit radius
      const radius = minRadius + Math.random() * (maxRadius - minRadius);
      
      // Random position on the orbit
      const theta = Math.random() * Math.PI * 2;
      
      // Calculate position
      const x = radius * Math.cos(theta);
      const z = radius * Math.sin(theta);
      
      // Random Y offset for more natural distribution
      const y = (Math.random() - 0.5) * 0.2;
      
      // Random rotation
      const rotation = new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      // Random size (most asteroids are small)
      const size = Math.pow(Math.random(), 3) * 0.01 + 0.01;
      
      // Random orbit speed
      const speed = (0.005 - 0.002) * Math.random() + 0.002;

      tempAsteroids.push({
        position: [x, y, z],
        rotation: [rotation.x, rotation.y, rotation.z],
        scale: [size, size, size],
        speed,
        radius,
        theta
      });
    }
    return tempAsteroids;
  }, []);

  // Animation
  useFrame((state, delta) => {
    asteroidField.current.children.forEach((asteroid, i) => {
      const data = asteroids[i];
      data.theta += data.speed * delta;
      
      const x = data.radius * Math.cos(data.theta);
      const z = data.radius * Math.sin(data.theta);
      
      asteroid.position.x = x;
      asteroid.position.z = z;
      
      asteroid.rotation.x += delta * 0.5;
      asteroid.rotation.y += delta * 0.5;
    });
  });


  return (
    <group ref={asteroidField}>
      {asteroids.map((data, i) => (
        <mesh key={i} position={data.position} rotation={data.rotation} scale={data.scale}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#8B7355"
            roughness={0.8}
            metalness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
};

export default AsteroidBelt
