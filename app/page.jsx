"use client";

import { useState } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import Sun from "@/components/new/Sun";
import Mercury from "@/components/new/planets/Mercury";
import Venus from "@/components/new/planets/Venus";
import Earth from "@/components/new/planets/Earth";
import Mars from "@/components/new/planets/Mars";
import Jupiter from "@/components/new/planets/Jupiter";
import Saturn from "@/components/new/planets/Saturn";
import Uranus from "@/components/new/planets/Uranus";
import Neptune from "@/components/new/planets/Neptune";

import NEOOrbit from "@/components/NEOOrbit";
import DetailsDrawer from "@/components/new/Details";
import StarField from "@/components/Stars";
import AsteroidBelt from "@/components/AsteroidBelt";

import { data } from "@/data";


export default function Home() {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [selectedNEO, setSelectedNEO] = useState(null);

  const planetData = {
    Mercury: { name: "Mercury", distance: "57.91 million km", diameter: "4,880 km" },
    Venus: { name: "Venus", distance: "108.2 million km", diameter: "12,104 km" },
    Earth: { name: "Earth", distance: "149.6 million km", diameter: "12,742 km" },
    Mars: { name: "Mars", distance: "227.9 million km", diameter: "6,779 km" },
    Jupiter: { name: "Jupiter", distance: "778.5 million km", diameter: "139,820 km" },
    Saturn: { name: "Saturn", distance: "1.43 billion km", diameter: "116,460 km" },
    Uranus: { name: "Uranus", distance: "2.87 billion km", diameter: "50,724 km" },
    Neptune: { name: "Neptune", distance: "4.5 billion km", diameter: "49,244 km" },
  };

  const handlePlanetClick = (planetName) => {
    setSelectedPlanet(planetData[planetName]);
    setSelectedNEO(null);
    setShowDetails(true);
  };

  const handleNEOClick = (neoData) => {
    setSelectedNEO({
      id: neoData.id,
      name: neoData.name,
      danger: neoData.isPotentiallyHazardous ? "Yes" : "No",
      distanceFromEarth: neoData.distanceFromEarth,
      size: neoData.diameter, 
    });
    setSelectedPlanet(null);
    setShowDetails(true);
  };



  return (
    <div className="h-full bg-black w-full justify-center items-center flex flex-col relative">
      <Canvas className="w-full h-[80vh] bg-black items-center flex flex-col justify-center">
        <OrbitControls enableZoom={true} enablePan={true} minDistance={0.2} maxDistance={100} />
        <ambientLight intensity={1.5} />
        <PerspectiveCamera makeDefault fov={50} position={[0, 1.5, 6]} />
        <directionalLight position={[10, 10, 10]} intensity={2} />

        {/* Planets */}
        <Sun />
        <Mercury onPlanetClick={() => handlePlanetClick("Mercury")} />
        <Venus onPlanetClick={() => handlePlanetClick("Venus")} />
        <Earth onPlanetClick={() => handlePlanetClick("Earth")} />
        <Mars onPlanetClick={() => handlePlanetClick("Mars")} />
        <Jupiter onPlanetClick={() => handlePlanetClick("Jupiter")} />
        <Saturn onPlanetClick={() => handlePlanetClick("Saturn")} />
        <Uranus onPlanetClick={() => handlePlanetClick("Uranus")} />
        <Neptune onPlanetClick={() => handlePlanetClick("Neptune")} />

        <AsteroidBelt />
        {/* NEOs */}
        {data.near_earth_objects.map((neo, index) => (
          <NEOOrbit
            key={index}
            orbitData={neo.orbital_data}
            onClick={() =>
              handleNEOClick({
                id: neo.id,
                name: neo.name,
                isPotentiallyHazardous: neo.is_potentially_hazardous_asteroid,
                distanceFromEarth: `${neo.close_approach_data[0].miss_distance.kilometers} km`,
                diameter: `${neo.estimated_diameter.kilometers.estimated_diameter_max} km`, // Correct size passed here
              })
            }
          />
        ))}

        <StarField
          count={5000}    // Number of stars
          radius={100}    // Radius of the star sphere
          depth={50}      // Depth of the star field
          size={0.1}      // Size of each star
          fade={true}     // Whether stars should twinkle
          speed={0.01}    // Rotation speed of the starfield
        />
      </Canvas>

      {showDetails && <div className="fixed inset-0 bg-white bg-opacity-0 z-10" onClick={() => setShowDetails(false)}></div>}

      {selectedPlanet && (
        <DetailsDrawer
          show={showDetails}
          planetName={selectedPlanet.name}
          distanceFromSun={selectedPlanet.distance}
          diameter={selectedPlanet.diameter}
          closeDrawer={() => setShowDetails(false)}
        />
      )}

      {selectedNEO && (
        <DetailsDrawer
          show={showDetails}
          id={selectedNEO.id}
          name={selectedNEO.name}
          danger={selectedNEO.danger}
          distanceFromEarth={selectedNEO.distanceFromEarth}
          diameter={selectedNEO.size}
          closeDrawer={() => setShowDetails(false)}
        />
      )}

    </div>
  );
}
