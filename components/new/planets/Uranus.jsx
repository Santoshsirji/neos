import React, { useState } from 'react';
import { Text, Line } from '@react-three/drei';

const Uranus = ({ onPlanetClick }) => {
  const [hovered, setHovered] = useState(false);

  // Orbit points for Uranus
  const points = Array.from({ length: 64 }, (_, i) => {
    const angle = (i / 64) * Math.PI * 2;
    return [Math.cos(angle) * 19.19, 0, Math.sin(angle) * 19.19];
  });

  return (
    <>
      <mesh
        position={[19.19, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onPlanetClick}
        style={{ cursor: hovered ? 'pointer' : 'auto' }}
      >
        <sphereGeometry args={[1 / 25, 32, 32]} />
        <meshStandardMaterial color={0x40e0d0} />
      </mesh>

      <Text
        onClick={onPlanetClick}
        position={[19.19, 0.1, 0]}
        fontSize={0.33}
        color="white"
        anchorX="center"
        anchorY="bottom">
        Uranus
      </Text>

      <Line points={points} color={hovered ? 'white' : 'gray'} lineWidth={1} />
    </>
  );
};

export default Uranus;
