import React from 'react';
import { Link } from 'react-router-dom';
import { CloudIcon } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <CloudIcon className="h-8 w-8 text-blue-500" />
          <span className="text-xl font-bold text-gray-800">Cloud Visualizer</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-gray-600 hover:text-blue-500">Home</Link>
            </li>
            <li>
              <Link to="/dashboard" className="text-gray-600 hover:text-blue-500">Dashboard</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;