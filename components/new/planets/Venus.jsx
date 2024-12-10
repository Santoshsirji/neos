import React, { useState } from 'react';
import { Text, Line } from '@react-three/drei';

const Venus = ({ onPlanetClick }) => {
  const [hovered, setHovered] = useState(false);

  // Orbit points for Venus
  const points = Array.from({ length: 64 }, (_, i) => {
    const angle = (i / 64) * Math.PI * 2;
    return [Math.cos(angle) * 0.72, 0, Math.sin(angle) * 0.72];
  });

  return (
    <>
      <mesh
        position={[0.72, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onPlanetClick}
        style={{ cursor: hovered ? 'pointer' : 'auto' }}
      >
        <sphereGeometry args={[1 / 30, 32, 32]} />
        <meshStandardMaterial color={0xdaa520} />
      </mesh>

      <Text
        onClick={onPlanetClick}
        position={[0.72, 0.1, 0]}
        fontSize={0.07}
        color="white"
        anchorX="center"
        anchorY="bottom">
        Venus
      </Text>

      <Line points={points} color={hovered ? 'white' : 'gray'} lineWidth={1} />
    </>
  );
};

export default Venus;
