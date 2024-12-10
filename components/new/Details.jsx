import React from 'react';

const DetailsDrawer = ({ show, planetName, distanceFromSun, diameter, id, name, distanceFromEarth, danger, size, closeDrawer }) => {
  return (
    <div
      className={`fixed top-0 right-0 w-80 h-full bg-zinc-950 shadow-xl transform transition-transform duration-100 ${
        show ? 'translate-x-0' : 'translate-x-full border-l border-white'
      }`}
    >
      <div className="p-6">
        <button
          className="text-white hover:opacity-85 focus:outline-none cursor-pointer"
          onClick={closeDrawer}
        >
          Close
        </button>

        {/* Planet Details */}
        {planetName && (
          <>
            <h2 className="text-xl font-bold text-white mt-4 mb-2">{planetName}</h2>
            <ul className="text-white">
              <li>
                <strong>Distance from Sun:</strong> {distanceFromSun}
              </li>
              <li>
                <strong>Diameter:</strong> {diameter}
              </li>
            </ul>
          </>
        )}

        {/* NEO Details */}
        {name && (
          <>
            <h2 className="text-xl font-bold text-white mt-4 mb-2">{`NEO: ${name}`}</h2>
            <ul className="text-white">
              <li>
                <strong>Distance from Earth:</strong> {distanceFromEarth}
              </li>
              <li>
                <strong>Hazardous:</strong> {danger}
              </li>
              <li>
                {/* <strong>Size:</strong> {size} Display the size here */}
              </li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default DetailsDrawer;
