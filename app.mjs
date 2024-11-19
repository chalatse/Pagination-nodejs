import express from 'express';
import data from './data.js';
import path from 'path';

const port = 4000;
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Serve static files (e.g., HTML, CSS, JS)
app.use(express.static('public'));

// Get paginated data
app.get('/api/items', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 5;
  const startIndex = (page - 1) * perPage;
  const endIndex = page * perPage;

  const paginatedData = data.slice(startIndex, endIndex);

  res.json({
    data: paginatedData,
    currentPage: page,
    totalPages: Math.ceil(data.length / perPage),
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
