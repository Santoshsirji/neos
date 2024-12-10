import React, { useState } from 'react';
import { Text, Line } from '@react-three/drei';

const Mars = ({ onPlanetClick }) => {
  const [hovered, setHovered] = useState(false);

  // Orbit points for Mars
  const points = Array.from({ length: 64 }, (_, i) => {
    const angle = (i / 64) * Math.PI * 2;
    return [Math.cos(angle) * 1.52, 0, Math.sin(angle) * 1.52];
  });

  return (
    <>
      <mesh
        position={[1.52, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onPlanetClick}
        style={{ cursor: hovered ? 'pointer' : 'auto' }}
      >
        <sphereGeometry args={[1 / 45, 32, 32]} />
        <meshStandardMaterial color={0xff4500} />
      </mesh>

      <Text
        onClick={onPlanetClick}
        position={[1.52, 0.1, 0]}
        fontSize={0.11}
        color="white"
        anchorX="center"
        anchorY="bottom">
        Mars
      </Text>

      <Line points={points} color={hovered ? 'white' : 'gray'} lineWidth={1} />
    </>
  );
};

export default Mars;
