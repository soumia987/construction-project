import React from 'react';

const Navbar = () => {
  return (
    <nav 
    className={`fixed top-0 left-0 w-full bg-gray-800 text-white p-8 transition-all duration-300`}
  >
    <div className="container flex items-center justify-between">
  
      <div className="text-lg font-bold">
        <a className="text-white hover:text-red-900" href="#Home">Logo</a>
      </div>

      <ul className="flex space-x-8 ml-auto">
        <li><a className="text-white hover:text-red-900" href="#Home">Home</a></li>
        <li><a className="text-white hover:text-red-900" href="#About">About</a></li>
        <li><a className="text-white hover:text-red-900" href="#Projects">Projects</a></li>
      </ul>
    </div>
  </nav>
  );
};

export default Navbar;
