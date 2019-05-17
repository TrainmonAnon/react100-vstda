const express = require('express');
const morgan = require('morgan');

const app = express();

const todoItems = [];

app.use(morgan('dev'));
app.use(express.static('dist'));
app.use(express.static('public'));

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send({});
});

app.get('/api/TodoItems', (req, res) => {
  res.status(200).send(todoItems);
});

app.get('/api/TodoItems/:id', (req, res) => {
  const id = req.params.id;
  for (let i = 0; i < todoItems.length; i += 1) {
    if (todoItems[i].todoItemId == id) {
      res.status(200).send(todoItems[i]);
      return;
    }
  }
});

app.post('/api/TodoItems', (req, res) => {
  const newTodo = {
    completed: req.body.completed,
    name: req.body.name,
    priority: req.body.priority,
    todoItemId: req.body.todoItemId
  };
  for (let i = 0; i < todoItems.length; i += 1) {
    if (todoItems[i].todoItemId == newTodo.todoItemId) {
      todoItems[i] = newTodo;
      res.status(201).send(newTodo);
      return;
    }
  }
  todoItems.push(newTodo);
  res.status(201).send(newTodo);
});

app.delete('/api/TodoItems/:id', (req, res) => {
  const id = req.params.id;
  for (let i = 0; i < todoItems.length; i += 1) {
    if (todoItems[i].todoItemId == id) {
      const deleted = todoItems.splice(i, 1)[0];
      res.status(200).send(deleted);
      return;
    }
  }
  res.sendStatus(404);
});

module.exports = app;
