const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const soapTest = require('./soap-client');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(Path.join(__dirname, 'public')));

//Render task list
app.get('/', async (req, res) => {
const result = await db.query('SELECT * FROM tasks ORDER BY created_at DESC');
res.render('index', { tasks: result.rows });
});

// Add a new task
app.post('/add', async (req, res) => {
    const { title} = req.body;
    await db.query('INSERT INTO tasks (title) VALUES ($1)', [title]);
    res.redirect('/');
});

// Toggle task completion
app.post('/toggle/:id', async (req, res) => {
  const { id } = req.params;
  await db.query('UPDATE tasks SET is_completed = NOT is_completed WHERE id = $1', [id]);
  res.redirect('/');
});

// Delete a task
app.post('/delete', async (req, res) => {
    const { id } = req.params;
    await db.query('DELETE FROM tasks WHERE id = $1', [id]);
    res.redirect('/');
});

// Optional: test SOAP
app.get('/soap-test', async (req, res) => {
  const response = await soapTest();
  res.send(`<pre>${JSON.stringify(response, null, 2)}</pre>`);
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});