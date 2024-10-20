import React, { useState, useEffect } from 'react';
import { useCloudStorage } from '../contexts/CloudStorageContext';
import TreeMap from '../components/TreeMap';
import FileList from '../components/FileList';
import CloudStorageSelector from '../components/CloudStorageSelector';
import { AlertCircle, BarChart2, List, Loader2, CloudIcon, Settings, X } from 'lucide-react';
import { analyzeFileStructure } from '../utils/analyzeFileStructure';

type AnalysisResult = {
  suggestions: string[];
};

const Dashboard: React.FC = () => {
  const { selectedStorage, fileStructure, isLoading, error, logout } = useCloudStorage();
  const [viewMode, setViewMode] = useState<'treemap' | 'list'>('treemap');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    if (fileStructure) {
      const result = analyzeFileStructure(fileStructure);
      setAnalysisResult(result);
    }
  }, [fileStructure]);

  const handleRevokeAccess = () => {
    localStorage.removeItem('accessToken');
    logout();
    setIsSettingsOpen(false);
    alert('Your access to cloud storage has been revoked.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Your Cloud Storage Dashboard</h1>
          <div className="flex items-center space-x-4">
            <CloudStorageSelector />
            {selectedStorage && (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsSettingsOpen(true)}
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Account Settings
                </button>
                <button
                  onClick={logout}
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
                >
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            {error}
          </div>
        )}

        {selectedStorage && (
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">File Structure Visualization</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setViewMode('treemap')}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${viewMode === 'treemap'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                  <BarChart2 className="h-4 w-4 mr-2" />
                  Tree Map
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${viewMode === 'list'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                  <List className="h-4 w-4 mr-2" />
                  List View
                </button>
              </div>
            </div>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
              </div>
            ) : fileStructure ? (
              viewMode === 'treemap' ? (
                <TreeMap data={fileStructure} />
              ) : (
                <FileList data={fileStructure} />
              )
            ) : null}
          </div>
        )}

        {!selectedStorage && !isLoading && (
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <CloudIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">
              Please select a cloud storage provider to view your files.
            </p>
          </div>
        )}

        {analysisResult && (
          <div className="bg-white shadow rounded-lg p-6 mt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">File Structure Analysis</h2>
            <ul className="space-y-2">
              {analysisResult.suggestions.map((suggestion: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>

      {isSettingsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Account Settings</h2>
              <button onClick={() => setIsSettingsOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>
            <p className="mb-4">
              You can revoke access to your cloud storage accounts at any time. Once revoked, FileMapr will no longer have access to your cloud files.
            </p>
            <button
              onClick={handleRevokeAccess}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-full"
            >
              Revoke Cloud Storage Access
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
