import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        At FileMapr, we are committed to protecting your privacy. This Privacy Policy outlines how your data is collected, used, and protected while using our services.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">Data We Do Not Store</h2>
      <p className="mb-4">
        We do not store any file structures, file contents, or personal data on our servers. All data is processed locally within your browser and never transmitted to our backend.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">Accessing Your Cloud Storage</h2>
      <p className="mb-4">
        FileMapr requires temporary access to your cloud storage accounts (e.g., Google Drive, Dropbox) via OAuth. This access allows us to generate the file structure visualizations. You can revoke this access at any time through your account settings or the cloud provider's security settings.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">Third-Party Services</h2>
      <p className="mb-4">
        FileMapr uses OAuth services provided by third-party cloud providers like Google and Dropbox to enable access to your cloud files. We do not share any information with these providers beyond what is required for authentication.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">Your Consent</h2>
      <p className="mb-4">
        By using FileMapr, you consent to the terms of this Privacy Policy. You can manage your permissions and revoke access to your cloud accounts at any time.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">Contact Us</h2>
      <p>
        If you have any questions about our privacy practices, please contact us at [your contact information].
      </p>
    </div>
  );
};

export default PrivacyPolicy;
