import React from 'react';
import { useCloudStorage } from '../contexts/CloudStorageContext';
import { CloudIcon, Box, HardDriveIcon } from 'lucide-react';

const CloudStorageSelector: React.FC = () => {
  const { selectStorage, selectedStorage, logout } = useCloudStorage();

  return (
    <div className="flex space-x-4 mb-8">
      <button
        onClick={() => selectStorage('google-drive')}
        className={`flex items-center px-4 py-2 border rounded-lg shadow-sm transition-colors ${
          selectedStorage === 'google-drive'
            ? 'bg-blue-500 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        <CloudIcon className="h-5 w-5 mr-2" />
        Google Drive
      </button>
      <button
        onClick={() => selectStorage('dropbox')}
        className={`flex items-center px-4 py-2 border rounded-lg shadow-sm transition-colors ${
          selectedStorage === 'dropbox'
            ? 'bg-blue-500 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        <Box className="h-5 w-5 mr-2" />
        Dropbox
      </button>
      <button
        onClick={() => selectStorage('terabox')}
        className={`flex items-center px-4 py-2 border rounded-lg shadow-sm transition-colors ${
          selectedStorage === 'terabox'
            ? 'bg-blue-500 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        <HardDriveIcon className="h-5 w-5 mr-2" />
        Terabox
      </button>
      {selectedStorage && (
        <button
          onClick={logout}
          className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg shadow-sm hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default CloudStorageSelector;