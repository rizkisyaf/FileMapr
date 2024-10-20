import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { FileStructure } from '../types';
import { fetchFileStructure, initiateGoogleDriveAuth, initiateDropboxAuth } from '../api/cloudStorage';

type CloudStorageType = 'google-drive' | 'dropbox' | 'terabox';

interface CloudStorageContextType {
  selectedStorage: CloudStorageType | null;
  fileStructure: FileStructure | null;
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;
  selectStorage: (storage: CloudStorageType) => void;
  setAccessToken: (token: string) => void;
  logout: () => void;
}

const CloudStorageContext = createContext<CloudStorageContextType | undefined>(undefined);

export const CloudStorageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedStorage, setSelectedStorage] = useState<CloudStorageType | null>(null);
  const [fileStructure, setFileStructure] = useState<FileStructure | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const selectStorage = useCallback(async (storage: CloudStorageType) => {
    setSelectedStorage(storage);
    setError(null);
    switch (storage) {
      case 'google-drive':
        initiateGoogleDriveAuth();
        break;
      case 'dropbox':
        initiateDropboxAuth();
        break;
      case 'terabox':
        setError('Terabox authentication not implemented');
        break;
    }
  }, []);

  const fetchFiles = useCallback(async () => {
    if (selectedStorage && accessToken) {
      setIsLoading(true);
      setError(null);
      try {
        const structure = await fetchFileStructure(selectedStorage, accessToken);
        setFileStructure(structure);
      } catch (error) {
        setError('Failed to fetch file structure. Please try again.');
        console.error('Error fetching file structure:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [selectedStorage, accessToken]);

  React.useEffect(() => {
    if (accessToken) {
      fetchFiles();
    }
  }, [accessToken, fetchFiles]);

  const logout = useCallback(() => {
    setSelectedStorage(null);
    setFileStructure(null);
    setAccessToken(null);
    setError(null);
  }, []);

  return (
    <CloudStorageContext.Provider 
      value={{ 
        selectedStorage, 
        fileStructure, 
        accessToken, 
        isLoading,
        error,
        selectStorage, 
        setAccessToken,
        logout
      }}
    >
      {children}
    </CloudStorageContext.Provider>
  );
};

export const useCloudStorage = () => {
  const context = useContext(CloudStorageContext);
  if (context === undefined) {
    throw new Error('useCloudStorage must be used within a CloudStorageProvider');
  }
  return context;
};