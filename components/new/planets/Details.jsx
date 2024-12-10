import React from 'react';

const Details = ({ show, planetName, distanceFromSun, diameter, closeDrawer }) => {
  return (
    <div
      className={`fixed top-0 right-0 w-80 h-full bg-zinc-800 duration-100 no-select shadow-lg p-6 transition-transform transform z-20 ${
        show ? 'translate-x-0' : 'translate-x-full'
      }`} 
      style={{ transitionDuration: '0.5s' }} // Slide in/out effect
      onClick={(e) => e.stopPropagation()} // Prevent click event from reaching the overlay
    >
      {/* Close Button */}
      <button
        onClick={closeDrawer}
        className="absolute top-4 right-4 text-white"
      >
        Close
      </button>
      {/* Planet Details */}
      <h2 className="text-xl font-bold text-white">{planetName}</h2>
      <ul className="mt-4 text-white space-y-2">
        <li>
          <span className="font-bold">Distance from Sun:</span> {distanceFromSun}
        </li>
        <li>
          <span className="font-bold">Diameter:</span> {diameter}
        </li>
        {/* Add more details as needed */}
      </ul>
    </div>
  );
};

export default Details;
