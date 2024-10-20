import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../contexts/UserContext';

interface Article {
  id: number;
  title: string;
  content: string;
  published: boolean;
}

const ArticleManager: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [newArticle, setNewArticle] = useState<Omit<Article, 'id' | 'published'>>({ title: '', content: '' });
  const { role } = useUser();

  // Check if the user is logged in and has a role
  if (!role) {
    return <p>You must be logged in to view this page.</p>;
  }

  useEffect(() => {
    // Only fetch articles if the user has a role (e.g., editor, author)
    if (role) {
      axios.get('/api/articles', { headers: { 'x-user-role': role } })
        .then(response => setArticles(response.data))
        .catch(error => console.error('Error fetching articles:', error));
    }
  }, [role]);

  const handleCreate = () => {
    if (role === 'author' || role === 'admin') {
      axios.post('/api/articles', newArticle, { headers: { 'x-user-role': role } })
        .then(response => setArticles([...articles, response.data]))
        .catch(error => console.error('Error creating article:', error));
    } else {
      alert('You do not have permission to create an article.');
    }
  };

  return (
    <div>
      <h1>Manage Articles</h1>
      <h2>Welcome, {role}</h2>

      {/* Only allow authors and admins to create articles */}
      {(role === 'author' || role === 'admin') && (
        <div>
          <input
            type="text"
            placeholder="Title"
            value={newArticle.title}
            onChange={e => setNewArticle({ ...newArticle, title: e.target.value })}
          />
          <textarea
            placeholder="Content"
            value={newArticle.content}
            onChange={e => setNewArticle({ ...newArticle, content: e.target.value })}
          />
          <button onClick={handleCreate}>Create Article</button>
        </div>
      )}

      <ul>
        {articles.map((article: Article) => (
          <li key={article.id}>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleManager;
