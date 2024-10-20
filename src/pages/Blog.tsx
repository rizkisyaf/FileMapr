import React, { useState } from 'react';
import ArticleManager from './ArticleManager';

// Define the User interface
interface User {
  role: string;
}

const Blog: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);  // User holds role info

  const login = (role: string) => {
    setUser({ role });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Blog</h1>
      {!user ? (
        <div>
          <button onClick={() => login('admin')} className="bg-blue-500 text-white px-4 py-2 rounded">Login as Admin</button>
          <button onClick={() => login('author')} className="bg-green-500 text-white px-4 py-2 rounded ml-2">Login as Author</button>
          <button onClick={() => login('editor')} className="bg-yellow-500 text-white px-4 py-2 rounded ml-2">Login as Editor</button>
        </div>
      ) : (
        <ArticleManager />
      )}
    </div>
  );
};

export default Blog;
