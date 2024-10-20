import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import { CloudStorageProvider, useCloudStorage } from './contexts/CloudStorageContext';
import PrivacyPolicy from './pages/PrivacyPolicy';
import AccountSettings from './pages/AccountSettings';
import ConsentDialog from './components/ConsentDialog';
import Blog from './pages/Blog';
import ArticleManager from './pages/ArticleManager';
import { UserProvider, useUser } from './contexts/UserContext';

function App() {
  return (
    <UserProvider>
      <CloudStorageProvider>
        <Router>
          <AppContent />
        </Router>
      </CloudStorageProvider>
    </UserProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setAccessToken } = useCloudStorage();
  const { role } = useUser();

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
      <ConsentDialog />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/account-settings" element={<AccountSettings />} />
          <Route path="/blog" element={<Blog />} />
          {['admin', 'author', 'editor'].includes(role) && (
            <Route path="/article-manager" element={<ArticleManager />} />
          )}
        </Routes>
      </main>
    </div>
  );
}

export default App;
