/* eslint-disable no-console */
/* eslint-disable radix */
/* eslint-disable linebreak-style */
const express = require('express');

const app = express();
app.use(express.json());

const courses = [
  { id: 1, name: 'Course 1' },
  { id: 2, name: 'Course 2' },
  { id: 3, name: 'Course 3' }
];

app.get('/api/v1/on-covid-19', (req, res) => {
  res.send('<h1>Working on it<h1>');
});


app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send('Resourse Unavailable');
  res.send(course);
});

app.post('/api/courses', (req, res) => {
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});


app.listen(3002, () => {
  console.log('Listening on port 3002...');
});
