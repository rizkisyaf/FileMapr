import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import ArticleManager from '../pages/ArticleManager';

const AdminPanel: React.FC = () => {
  const { role, logout } = useUser();

  // Add a debug log to check the role
  console.log("AdminPanel role:", role);

  if (!role) {
    return <p>You must be logged in to view this page.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Admin Panel</h1>
        <div>
          <Link to="/blog" className="text-blue-600 hover:underline mr-4">Back to Blog</Link>
          <button onClick={logout} className="text-red-600 hover:underline">Logout</button>
        </div>
      </header>
      <p className="mb-8">Welcome, {role}</p>
      <ArticleManager />
    </div>
  );
};

export default AdminPanel;
