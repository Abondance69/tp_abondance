const todoRoute = require('express').Router();
const todoController = require('../../controllers/todo');
const {checkIsAuth} = require("../../config/jwtConfig");

module.exports = (app) => {
  todoRoute.post('/todo', checkIsAuth,  todoController.create);
  todoRoute.get('/todos', checkIsAuth, todoController.getAll);
  todoRoute.get('/todo/:id', checkIsAuth,  todoController.getById);
  todoRoute.put('/todo/:id', checkIsAuth,  todoController.update);
  todoRoute.delete('/todo/:id', checkIsAuth, todoController.delete);
  app.use('/api/v1', todoRoute);
};
