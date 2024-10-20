import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import { CloudStorageProvider, useCloudStorage } from './contexts/CloudStorageContext';

function App() {
  return (
    <CloudStorageProvider>
      <Router>
        <AppContent />
      </Router>
    </CloudStorageProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setAccessToken } = useCloudStorage();

  useEffect(() => {
    const hash = location.hash;
    if (hash.includes('access_token')) {
      const accessToken = new URLSearchParams(hash.slice(1)).get('access_token');
      if (accessToken) {
        setAccessToken(accessToken);
        navigate('/dashboard', { replace: true });
      }
    }
  }, [location, navigate, setAccessToken]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;