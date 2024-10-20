import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate, Link } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import { CloudStorageProvider, useCloudStorage } from './contexts/CloudStorageContext';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ConsentDialog from './components/ConsentDialog';
import Blog from './components/Blog';
import ArticleManager from './pages/ArticleManager';
import { UserProvider, useUser } from './contexts/UserContext';
import BlogPost from './components/BlogPost';
import AdminPanel from './components/AdminPanel';

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

  // Conditionally render footer based on the current route
  const isHomePage = location.pathname === "/";

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <ConsentDialog />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          {['admin', 'author', 'editor'].includes(role) && (
            <>
            <Route path="/article-manager" element={<ArticleManager />} />
            <Route path="/admin" element={<AdminPanel />} />
            </>
          )}
        </Routes>
      </main>
      
      {/* Conditionally render the footer only if the route is not Home */}
      {!isHomePage && (
        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-between items-center">
              <div className="w-full md:w-1/3 mb-4 md:mb-0">
                <h3 className="text-lg font-semibold mb-2">FileMapr</h3>
                <p className="text-sm">Visualize and optimize your file structure for better productivity.</p>
              </div>
              <div className="w-full md:w-1/3 mb-4 md:mb-0">
                <h4 className="text-md font-semibold mb-2">Quick Links</h4>
                <ul className="text-sm">
                  <li><Link to="/" className="hover:underline">Home</Link></li>
                  <li><Link to="/dashboard" className="hover:underline">Dashboard</Link></li>
                  <li><Link to="/blog" className="hover:underline">Blog</Link></li>
                </ul>
              </div>
              <div className="w-full md:w-1/3">
                <h4 className="text-md font-semibold mb-2">Legal</h4>
                <ul className="text-sm">
                  <li><Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
                  <li><Link to="/privacy-policy#terms" className="hover:underline">Terms and Conditions</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
              <p>&copy; {new Date().getFullYear()} FileMapr. All rights reserved.</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;
