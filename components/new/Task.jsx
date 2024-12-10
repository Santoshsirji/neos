import React, { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const EARTH_DISTANCE = 2; // Earth's distance from Sun in your scale
const EARTH_RADIUS = 1 / 30; // Earth's radius in your scale
const AU_TO_KM = 149597870.7; // 1 AU in km

const NEO = ({ position, size, color }) => {
  const meshRef = useRef()

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5
      meshRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

const NEOField = ({ neoData }) => {
  return (
    <group>
      {neoData.map((neo, index) => (
        <NEO
          key={index}
          position={neo.position}
          size={neo.size}
          color={neo.color}
        />
      ))}
    </group>
  )
}

const NEOVisualization = () => {
  const [neoData, setNeoData] = useState([])

  useEffect(() => {
    const fetchNEOData = async () => {
      try {
        const API_KEY = 'DEMO_KEY' // Replace with your NASA API key
        const today = new Date().toISOString().split('T')[0]
        const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${API_KEY}`
        
        const response = await fetch(url)
        const data = await response.json()
        console.log(data);
        const processedData = Object.values(data.near_earth_objects)
          .flat()
          .map(neo => {
            const distanceKm = parseFloat(neo.close_approach_data[0].miss_distance.kilometers)
            const distanceAU = distanceKm / AU_TO_KM
            const scaledDistance = distanceAU * EARTH_DISTANCE
            
            // Generate a random position on a sphere with radius of scaledDistance
            const theta = Math.random() * Math.PI * 2
            const phi = Math.acos(2 * Math.random() - 1)
            const x = scaledDistance * Math.sin(phi) * Math.cos(theta)
            const y = scaledDistance * Math.sin(phi) * Math.sin(theta)
            const z = scaledDistance * Math.cos(phi)

            return {
              position: [x, y, z],
              size: (neo.estimated_diameter.kilometers.estimated_diameter_max / 12742) * EARTH_RADIUS * 2, // Scale relative to Earth
              color: new THREE.Color(Math.random(), Math.random(), Math.random()),
              name: neo.name,
              distance: distanceKm
            }
          })
        
        setNeoData(processedData)
      } catch (error) {
        console.error("Error fetching NEO data:", error)
      }
    }

    fetchNEOData()
  }, [])

  return <NEOField neoData={neoData} />
}

export default NEOVisualization