import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

interface Article {
  id: number;
  title: string;
  content: string;
  author: string;
  published: boolean;
}

const BlogPost: React.FC = () => {
  const [article, setArticle] = useState<Article | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    axios.get(`/api/articles/${id}`)
      .then(response => setArticle(response.data))
      .catch(error => console.error('Error fetching article:', error));
  }, [id]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link to="/blog" className="text-blue-600 hover:underline mb-4 block">&larr; Back to all articles</Link>
      <article>
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        <p className="text-gray-600 mb-8">By {article.author}</p>
        <div className="prose max-w-none">
          {article.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </div>
      </article>
    </div>
  );
};

export default BlogPost;