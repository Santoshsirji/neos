import React from 'react'


const Sun = () => {
  return (
    <mesh>
      <sphereGeometry args={[0.0930093452, 32, 32]} position={[0, -0.01, 0]} />
      <directionalLight position={[0, 0, 0]} intensity={2} color="yellow" />
      <ambientLight intensity={0.5} />

      <meshStandardMaterial color={0xFFFF00} />
    </mesh>
  )
}

export default Sun
