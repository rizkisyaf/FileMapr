import React from 'react';
import { Link } from 'react-router-dom';
import { CloudIcon, Box, HardDriveIcon } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-8">Welcome to Cloud Visualizer</h1>
      <p className="text-xl mb-8">Visualize and manage your cloud storage files with ease.</p>
      <div className="flex justify-center space-x-8 mb-12">
        <div className="text-center">
          <CloudIcon className="h-16 w-16 text-blue-500 mx-auto mb-4" />
          <h2 className="text-lg font-semibold">Google Drive</h2>
        </div>
        <div className="text-center">
          <Box className="h-16 w-16 text-blue-500 mx-auto mb-4" />
          <h2 className="text-lg font-semibold">Dropbox</h2>
        </div>
        <div className="text-center">
          <HardDriveIcon className="h-16 w-16 text-blue-500 mx-auto mb-4" />
          <h2 className="text-lg font-semibold">Terabox</h2>
        </div>
      </div>
      <Link
        to="/dashboard"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300"
      >
        Get Started
      </Link>
    </div>
  );
};

export default Home;