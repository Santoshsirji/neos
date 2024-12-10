import React, { useState } from 'react';
import { Text, Line } from '@react-three/drei';

const Mercury = ({ onPlanetClick }) => {
  const [hovered, setHovered] = useState(false);

  // Orbit points calculation (circle in x-z plane)
  const points = Array.from({ length: 64 }, (_, i) => {
    const angle = (i / 64) * Math.PI * 2;
    return [Math.cos(angle) * 0.39, 0, Math.sin(angle) * 0.39];
  });

  return (
    <>
      {/* Mercury Planet */}
      <mesh
        position={[0.39, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onPlanetClick}
        style={{ cursor: hovered ? 'pointer' : 'auto' }}
      >
        <sphereGeometry args={[1 / 40, 32, 32]} />
        <meshStandardMaterial color={0xa020f0} />
      </mesh>

      {/* Mercury's Name */}
      <Text
        onClick={onPlanetClick}
        position={[0.39, 0.1, 0]} // Position just above Mercury
        fontSize={0.06}
        color="white"
        anchorX="center"
        anchorY="bottom"
      >
        Mercury
      </Text>

      {/* Mercury's Orbit */}
      <Line
        points={points} // Array of 3D points defining the orbit path
        color={hovered ? 'white' : 'gray'} // Change color on hover
        lineWidth={1}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      />
    </>
  );
};

export default Mercury;
