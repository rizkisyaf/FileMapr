import React from 'react';
import { useCloudStorage } from '../contexts/CloudStorageContext';

const AccountSettings: React.FC = () => {
  const { logout } = useCloudStorage();

  const handleRevokeAccess = () => {
    // Clear stored access token and logout
    localStorage.removeItem('accessToken');
    logout();
    alert('Your access to cloud storage has been revoked.');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Account Settings</h1>
      <p className="mb-4">
        You can revoke access to your cloud storage accounts at any time. Once revoked, FileMapr will no longer have access to your cloud files.
      </p>
      <button
        onClick={handleRevokeAccess}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        Revoke Cloud Storage Access
      </button>
    </div>
  );
};

export default AccountSettings;
