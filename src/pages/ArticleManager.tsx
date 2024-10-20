import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../contexts/UserContext';

interface Article {
  id: number;
  title: string;
  content: string;
  author: string;
  published: boolean;
}

const ArticleManager: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [newArticle, setNewArticle] = useState<Omit<Article, 'id' | 'published'>>({ title: '', content: '', author: '' });
  const { role } = useUser();

  // Debug the role in ArticleManager
  console.log("ArticleManager role:", role);

  useEffect(() => {
    if (role) {
      axios.get('/api/articles', { headers: { 'x-user-role': role } })
        .then(response => setArticles(response.data))
        .catch(error => console.error('Error fetching articles:', error));
    }
  }, [role]);

  const handleCreate = () => {
    if (role === 'author' || role === 'admin') {
      axios.post('/api/articles', newArticle, { headers: { 'x-user-role': role } })
        .then(response => {
          setArticles([...articles, response.data]);
          setNewArticle({ title: '', content: '', author: '' });
        })
        .catch(error => console.error('Error creating article:', error));
    }
  };

  const handlePublish = (id: number) => {
    if (role === 'editor' || role === 'admin') {
      axios.put(`/api/articles/${id}`, { published: true }, { headers: { 'x-user-role': role } })
        .then(response => {
          setArticles(articles.map(article => article.id === id ? response.data : article));
        })
        .catch(error => console.error('Error publishing article:', error));
    }
  };

  return (
    <div className="space-y-8">
      {(role === 'author' || role === 'admin') && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Create New Article</h2>
          <input
            type="text"
            placeholder="Title"
            value={newArticle.title}
            onChange={e => setNewArticle({ ...newArticle, title: e.target.value })}
            className="w-full p-2 mb-4 border rounded"
          />
          <input
            type="text"
            placeholder="Author"
            value={newArticle.author}
            onChange={e => setNewArticle({ ...newArticle, author: e.target.value })}
            className="w-full p-2 mb-4 border rounded"
          />
          <textarea
            placeholder="Content"
            value={newArticle.content}
            onChange={e => setNewArticle({ ...newArticle, content: e.target.value })}
            className="w-full p-2 mb-4 border rounded h-32"
          />
          <button onClick={handleCreate} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Create Article
          </button>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Manage Articles</h2>
        <ul className="space-y-4">
          {articles.map((article: Article) => (
            <li key={article.id} className="border-b pb-4">
              <h3 className="text-xl font-semibold">{article.title}</h3>
              <p className="text-gray-600">By {article.author}</p>
              <p className="text-gray-800 mb-2">{article.content.substring(0, 100)}...</p>
              {!article.published && (role === 'editor' || role === 'admin') && (
                <button 
                  onClick={() => handlePublish(article.id)}
                  className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                >
                  Publish
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ArticleManager;
