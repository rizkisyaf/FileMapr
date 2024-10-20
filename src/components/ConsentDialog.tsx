import React, { useState } from 'react';

const ConsentDialog: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleAccept = () => {
    localStorage.setItem('userConsent', 'true');
    setIsVisible(false);
  };

  if (!isVisible || localStorage.getItem('userConsent') === 'true') {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow p-4">
      <p className="mb-4">
        By using FileMapr, you agree to our Privacy Policy, including the use of temporary access to your cloud storage for visualization purposes.
      </p>
      <button
        onClick={handleAccept}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Accept
      </button>
    </div>
  );
};

export default ConsentDialog;