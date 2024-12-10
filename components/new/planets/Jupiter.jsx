import React, { useState } from 'react';
import { Text, Line } from '@react-three/drei';

const Jupiter = ({ onPlanetClick }) => {
  const [hovered, setHovered] = useState(false);

  // Orbit points for Jupiter
  const points = Array.from({ length: 64 }, (_, i) => {
    const angle = (i / 64) * Math.PI * 2;
    return [Math.cos(angle) * 5.20, 0, Math.sin(angle) * 5.20];
  });

  return (
    <>
      <mesh
        position={[5.20, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onPlanetClick}
        style={{ cursor: hovered ? 'pointer' : 'auto' }}
      >
        <sphereGeometry args={[1 / 10, 32, 32]} />
        <meshStandardMaterial color={0xd2691e} />
      </mesh>

      <Text
        onClick={onPlanetClick}
        position={[5.20, 0.1, 0]}
        fontSize={0.18}
        color="white"
        anchorX="center"
        anchorY="bottom">
        Jupiter
      </Text>

      <Line points={points} color={hovered ? 'white' : 'gray'} lineWidth={1} />
    </>
  );
};

export default Jupiter;
