import React, { useState } from 'react';
import { Text, Line } from '@react-three/drei';

const Saturn = ({ onPlanetClick }) => {
  const [hovered, setHovered] = useState(false);

  // Orbit points for Saturn
  const points = Array.from({ length: 64 }, (_, i) => {
    const angle = (i / 64) * Math.PI * 2;
    return [Math.cos(angle) * 9.54, 0, Math.sin(angle) * 9.54];
  });

  return (
    <>
      <mesh
        position={[9.54, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onPlanetClick}
        style={{ cursor: hovered ? 'pointer' : 'auto' }}
      >
        <sphereGeometry args={[1 / 12, 32, 32]} />
        <meshStandardMaterial color={0xffd700} />
      </mesh>

      <Text
        onClick={onPlanetClick}
        position={[9.54, 0.1, 0]}
        fontSize={0.25}
        color="white"
        anchorX="center"
        anchorY="bottom">
        Saturn
      </Text>

      <Line points={points} color={hovered ? 'white' : 'gray'} lineWidth={1} />
    </>
  );
};

export default Saturn;
