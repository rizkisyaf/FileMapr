import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../contexts/UserContext';

interface Article {
  id: number;
  title: string;
  content: string;
  author: string;
  published: boolean;
}

const BlogPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const { role, login } = useUser();

  useEffect(() => {
    axios.get('/api/articles')
      .then(response => {
        // Ensure that the response is an array, even if it's empty
        const fetchedArticles = Array.isArray(response.data) ? response.data : [];
        setArticles(fetchedArticles);
      })
      .catch(error => {
        console.error('Error fetching articles:', error);
        setArticles([]);  // Ensure the state is set to an empty array on error
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">FileMapr Blog</h1>
        {!role ? (
          <button onClick={() => login('admin')} className="text-sm text-gray-600 hover:underline">
            Admin Login
          </button>
        ) : (
          <Link to="/admin" className="text-sm text-gray-600 hover:underline">
            Admin Panel
          </Link>
        )}
      </header>
      <div className="space-y-8">
        {articles.length > 0 ? (
          articles.map(article => (
            <article key={article.id} className="border-b pb-8">
              <Link to={`/blog/${article.id}`}>
                <h2 className="text-2xl font-bold mb-2 hover:underline">{article.title}</h2>
              </Link>
              <p className="text-gray-600 mb-4">By {article.author}</p>
              <p className="text-gray-800">{article.content.substring(0, 200)}...</p>
              <Link to={`/blog/${article.id}`} className="text-blue-600 hover:underline">
                Read more
              </Link>
            </article>
          ))
        ) : (
          <p>No articles available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
