import React, { useState } from 'react';
import { useCloudStorage } from '../contexts/CloudStorageContext';
import TreeMap from '../components/TreeMap';
import FileList from '../components/FileList';
import CloudStorageSelector from '../components/CloudStorageSelector';
import { AlertCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { selectedStorage, fileStructure, isLoading, error } = useCloudStorage();
  const [viewMode, setViewMode] = useState<'treemap' | 'list'>('treemap');

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Your Cloud Storage Dashboard</h1>
      <CloudStorageSelector />
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          {error}
        </div>
      )}
      {selectedStorage && (
        <div className="mb-4">
          <button
            onClick={() => setViewMode('treemap')}
            className={`mr-2 px-4 py-2 rounded transition-colors ${
              viewMode === 'treemap' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Tree Map
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded transition-colors ${
              viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            List View
          </button>
        </div>
      )}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
      ) : selectedStorage && fileStructure ? (
        viewMode === 'treemap' ? (
          <TreeMap data={fileStructure} />
        ) : (
          <FileList data={fileStructure} />
        )
      ) : (
        <p className="text-gray-600">Please select a cloud storage provider to view your files.</p>
      )}
    </div>
  );
};

export default Dashboard;