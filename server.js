const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/articles', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Article = mongoose.model('Article', {
  content: String,
  createdAt: Date,
});

app.use(express.json());

app.post('/articles', async (req, res) => {
  const { content } = req.body;
  const article = new Article({
    content,
    createdAt: new Date(),
  });

  await article.save();
  res.json(article);
});

cron.schedule('0 0 * * *', async () => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  await Article.deleteMany({ createdAt: { $lt: thirtyDaysAgo } });
  console.log('Deleted old articles.');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
