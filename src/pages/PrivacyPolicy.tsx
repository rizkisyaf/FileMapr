import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy and Terms of Service</h1>
      
      <section id="privacy-policy">
        <h2 className="text-2xl font-semibold mt-6 mb-2">Privacy Policy</h2>
        <p className="mb-4">
          At FileMapr, we are committed to protecting your privacy. This Privacy Policy outlines how your data is collected, used, and protected while using our services.
        </p>
        <h3 className="text-xl font-semibold mt-4 mb-2">Data We Do Not Store</h3>
        <p className="mb-4">
          We do not store any file structures, file contents, or personal data on our servers. All data is processed locally within your browser and never transmitted to our backend.
        </p>
        <h3 className="text-xl font-semibold mt-4 mb-2">Accessing Your Cloud Storage</h3>
        <p className="mb-4">
          FileMapr requires temporary access to your cloud storage accounts (e.g., Google Drive, Dropbox) via OAuth. This access allows us to generate the file structure visualizations. You can revoke this access at any time through your account settings or the cloud provider's security settings.
        </p>
        <h3 className="text-xl font-semibold mt-4 mb-2">Third-Party Services</h3>
        <p className="mb-4">
          FileMapr uses OAuth services provided by third-party cloud providers like Google and Dropbox to enable access to your cloud files. We do not share any information with these providers beyond what is required for authentication.
        </p>
        <h3 className="text-xl font-semibold mt-4 mb-2">Your Consent</h3>
        <p className="mb-4">
          By using FileMapr, you consent to the terms of this Privacy Policy. You can manage your permissions and revoke access to your cloud accounts at any time.
        </p>
      </section>

      <section id="terms">
        <h2 className="text-2xl font-semibold mt-6 mb-2">Terms and Conditions</h2>
        <p className="mb-4">
          By using FileMapr, you agree to the following terms and conditions:
        </p>
        <ol className="list-decimal list-inside mb-4">
          <li className="mb-2">You will use FileMapr only for lawful purposes and in accordance with these Terms.</li>
          <li className="mb-2">You will not use FileMapr in any way that could damage, disable, overburden, or impair our servers or networks.</li>
          <li className="mb-2">You are responsible for maintaining the confidentiality of your account and password.</li>
          <li className="mb-2">FileMapr reserves the right to terminate your access to the service for any reason, without notice.</li>
          <li className="mb-2">FileMapr is provided "as is" without any warranties, express or implied.</li>
          <li className="mb-2">FileMapr is not responsible for any damages resulting from your use of the service.</li>
        </ol>
      </section>

      <section id="contact">
        <h2 className="text-2xl font-semibold mt-6 mb-2">Contact Us</h2>
        <p>
          If you have any questions about our privacy practices or these terms, please contact us at support@filemapr.com.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;