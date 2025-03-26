import React from 'react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-50 text-white p-5 flex justify-between items-center z-50">
      <div className="text-2xl">
        <h1>
          X<span className="text-[#87bc29]">Construction</span>
        </h1>
      </div>
      {/* <ul className="flex space-x-6"> */}
        {/* <li><a href="#" className="text-white hover:border-b-2 border-white px-2">Home</a></li> */}
        {/* <li><a href="#View-projects" className="text-white hover:border-b-2 border-white px-2"> View Projects</a></li> */}
      {/* </ul> */}
    </nav>
  );
};

export default Navbar;
