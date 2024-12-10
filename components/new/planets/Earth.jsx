import React, { useState } from 'react';
import { Text, Line } from '@react-three/drei';

const Earth = ({ onPlanetClick }) => {
  const [hovered, setHovered] = useState(false);

  // Orbit points for Earth
  const points = Array.from({ length: 64 }, (_, i) => {
    const angle = (i / 64) * Math.PI * 2;
    return [Math.cos(angle) * 1, 0, Math.sin(angle) * 1];
  });

  return (
    <>
      <mesh
        position={[1, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onPlanetClick}
        style={{ cursor: hovered ? 'pointer' : 'auto' }}
      >
        <sphereGeometry args={[1 / 30, 32, 32]} />
        <meshStandardMaterial color={0x0000ff} />
      </mesh>

      <Text
        onClick={onPlanetClick}
        position={[1, 0.1, 0]}
        fontSize={0.1}
        color="white"
        anchorX="center"
        anchorY="bottom">
        Earth
      </Text>

      <Line points={points} color={hovered ? 'white' : 'gray'} lineWidth={1} />
    </>
  );
};

export default Earth;
