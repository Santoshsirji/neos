"use client";
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useRef } from 'react';
import OrbitPath from './OrbitPath';

const calculatePosition = (orbitData, time) => {
  const AU_SCALE = 1; // Keep this consistent with OrbitPath
  const a = orbitData.semi_major_axis * AU_SCALE;
  const e = orbitData.eccentricity;
  const i = THREE.MathUtils.degToRad(orbitData.inclination);
  const omega = THREE.MathUtils.degToRad(orbitData.ascending_node_longitude);
  const w = THREE.MathUtils.degToRad(orbitData.perihelion_argument);

  // Calculate mean anomaly
  const M = THREE.MathUtils.degToRad(orbitData.mean_anomaly) + 
            (orbitData.mean_motion ? orbitData.mean_motion * time : time);

  // Solve Kepler's equation for eccentric anomaly (E)
  let E = M;
  for (let j = 0; j < 5; j++) {
    E = M + e * Math.sin(E);
  }

  // Calculate true anomaly
  const trueAnomaly = 2 * Math.atan2(
    Math.sqrt(1 + e) * Math.sin(E / 2),
    Math.sqrt(1 - e) * Math.cos(E / 2)
  );

  // Calculate distance from focus
  const r = a * (1 - e * Math.cos(E));

  // Position in orbital plane
  let x = r * Math.cos(trueAnomaly);
  let y = r * Math.sin(trueAnomaly);
  let z = 0;

  // Create a vector for the position
  const pos = new THREE.Vector3(x, y, z);
  
  // Apply orbital rotations in the correct order
  pos.applyAxisAngle(new THREE.Vector3(0, 0, 1), w);      // Argument of perihelion
  pos.applyAxisAngle(new THREE.Vector3(1, 0, 0), i);      // Inclination
  pos.applyAxisAngle(new THREE.Vector3(0, 0, 1), omega);  // Longitude of ascending node

  return [pos.x, pos.y, pos.z];
};

const NEOOrbit = ({ orbitData, onClick }) => {
  const neoRef = useRef();
  const timeScale = 0.01; // Adjust this to control NEO speed

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime() * timeScale;
    const [x, y, z] = calculatePosition(orbitData, time);

    if (neoRef.current) {
      neoRef.current.position.set(x, y, z);
    }
  });

  return (
    <>
      <mesh ref={neoRef} onClick={onClick}>
        <sphereGeometry args={[0.02, 32, 32]} /> {/* Slightly smaller for better visualization */}
        <meshStandardMaterial color="grey" />
      </mesh>
      <OrbitPath orbitData={orbitData} />
    </>
  );
};

export default NEOOrbit;