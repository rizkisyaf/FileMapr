import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(bodyParser.json());

let articles = [
  { id: 1, title: 'Understanding File Management', content: 'Content about file management...', author: 'Author1', published: false },
  { id: 2, title: 'Best Practices for File Organization', content: 'Content about file organization...', author: 'Author2', published: true },
];

function checkRole(role) {
  return (req, res, next) => {
    const userRole = req.headers['x-user-role'];
    if (userRole === role || userRole === 'admin') {
      next();
    } else {
      res.status(403).send('Forbidden');
    }
  };
}

app.get('/api/articles', (req, res) => {
  res.json(articles.filter(article => article.published || req.headers['x-user-role'] === 'editor'));
});

app.post('/api/articles', checkRole('author'), (req, res) => {
  const newArticle = { id: articles.length + 1, ...req.body, published: false };
  articles.push(newArticle);
  res.status(201).json(newArticle);
});

app.put('/api/articles/:id', checkRole('editor'), (req, res) => {
  const article = articles.find(a => a.id === parseInt(req.params.id));
  if (article) {
    Object.assign(article, req.body);
    res.json(article);
  } else {
    res.status(404).send('Article not found');
  }
});

app.listen(5001, () => {
  console.log('Server is running on port 5000');
});
