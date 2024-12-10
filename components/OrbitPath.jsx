"use client";
import { useRef, useMemo, useState } from 'react';
import * as THREE from 'three';
import { Line } from '@react-three/drei';

// Function to generate a consistent color based on orbital parameters
const generateOrbitColor = (orbitData) => {
  // Use semi-major axis and eccentricity to generate a unique-ish hue
  const hue = ((orbitData.semi_major_axis * 100 + orbitData.eccentricity * 360) % 360) / 360;
  return new THREE.Color().setHSL(hue, 0.7, 0.5);
};

const OrbitPath = ({ orbitData }) => {
  const [hovered, setHovered] = useState(false);
  const orbitColor = useMemo(() => generateOrbitColor(orbitData), [orbitData]);

  const points = useMemo(() => {
    const getOrbitPoints = (orbitData, steps = 600) => {
      const points = [];
      const AU_SCALE = 1;

      const a = orbitData.semi_major_axis * AU_SCALE;
      const e = orbitData.eccentricity;
      const i = THREE.MathUtils.degToRad(orbitData.inclination);
      const omega = THREE.MathUtils.degToRad(orbitData.ascending_node_longitude);
      const w = THREE.MathUtils.degToRad(orbitData.perihelion_argument);

      for (let t = 0; t <= 2 * Math.PI; t += (2 * Math.PI) / steps) {
        const E = t;
        let eccentricAnomaly = E;

        for (let j = 0; j < 5; j++) {
          eccentricAnomaly = E + e * Math.sin(eccentricAnomaly);
        }

        const trueAnomaly = 2 * Math.atan2(
          Math.sqrt(1 + e) * Math.sin(eccentricAnomaly / 2),
          Math.sqrt(1 - e) * Math.cos(eccentricAnomaly / 2)
        );

        const r = a * (1 - e * Math.cos(eccentricAnomaly));

        const x = r * Math.cos(trueAnomaly);
        const y = r * Math.sin(trueAnomaly);
        const z = 0;

        const pos = new THREE.Vector3(x, y, z);
        pos.applyAxisAngle(new THREE.Vector3(0, 0, 1), w);      // Apply argument of perihelion
        pos.applyAxisAngle(new THREE.Vector3(1, 0, 0), i);      // Apply inclination
        pos.applyAxisAngle(new THREE.Vector3(0, 0, 1), omega);  // Apply longitude of ascending node

        points.push(pos);
      }
      
      return points;
    };

    return getOrbitPoints(orbitData);
  }, [orbitData]);

  const linePoints = useMemo(() => {
    return points.map(point => [point.x, point.y, point.z]);
  }, [points]);

  return (
    <group
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      <Line
        points={linePoints}
        color={hovered ? 'white' : orbitColor}
        lineWidth={hovered ? 2 : 1}
        dashed={false}
      />
    </group>
  );
};

export default OrbitPath;