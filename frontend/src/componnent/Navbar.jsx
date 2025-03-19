import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-red-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">Logo</div>
        <ul className="flex space-x-6">
          <li>
            <a
              href="#home"
              className="text-white hover:text-yellow-300 transition duration-200"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="text-white hover:text-yellow-300 transition duration-200"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#services"
              className="text-white hover:text-yellow-300 transition duration-200"
            >
              Services
            </a>
          </li>
          <li>
           
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
