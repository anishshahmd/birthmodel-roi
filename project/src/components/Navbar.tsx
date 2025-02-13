import React from 'react';
import { Link } from 'react-router-dom';
import { BrainCircuit } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BrainCircuit className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">BirthModel</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-blue-600 px-3 py-2">Home</Link>
            <Link to="/calculator" className="text-gray-700 hover:text-blue-600 px-3 py-2">Calculator</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 px-3 py-2">About</Link>
            <Link to="/benefits" className="text-gray-700 hover:text-blue-600 px-3 py-2">Benefits</Link>
            <a 
              href="mailto:demo@birthmodel.com" 
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Get Demo
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;