import React, { useState } from 'react';
import { Text, Line } from '@react-three/drei';

const Neptune = ({ onPlanetClick }) => {
  const [hovered, setHovered] = useState(false);

  // Orbit points for Neptune
  const points = Array.from({ length: 64 }, (_, i) => {
    const angle = (i / 64) * Math.PI * 2;
    return [Math.cos(angle) * 30.07, 0, Math.sin(angle) * 30.52];
  });

  return (
    <>
      <mesh
        position={[30.07, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onPlanetClick}
        style={{ cursor: hovered ? 'pointer' : 'auto' }}
      >
        <sphereGeometry args={[1 / 25, 32, 32]} />
        <meshStandardMaterial color={0x00008b} />
      </mesh>

      <Text
        onClick={onPlanetClick}
        position={[30.07, 0.1, 0]}
        fontSize={0.4}
        color="white"
        anchorX="center"
        anchorY="bottom">
        Neptune
      </Text>

      <Line points={points} color={hovered ? 'white' : 'gray'} lineWidth={1} />
    </>
  );
};

export default Neptune;
