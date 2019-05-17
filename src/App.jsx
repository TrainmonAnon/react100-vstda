import React, { Component } from 'react';
import axios from 'axios';
import TodoItem from './todoItem';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      todos: [],
      currentText: '',
      currentPriority: '1',
      id: 0,
      sort: 'id',
    };
    this.updateTodo = this.updateTodo.bind(this);
  }
  createTodo() {
    axios.post('/api/TodoItems',
      {
        name: this.state.currentText,
        priority: this.state.currentPriority,
        todoItemId: this.state.id,
        completed: false,
      })
      .then(() => {
        axios.get('/api/TodoItems')
          .then(res =>
            this.setState({
              todos: res.data,
              id: this.state.id + 1,
            })
          );
      });
  }
  update(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }
  updateTodo(type, state) {
    console.log(state);
    switch (type) {
      case 'delete':
        axios.delete(`/api/TodoItems/${state.id}`)
          .then(() => {
            axios.get('/api/TodoItems')
              .then(res =>
                this.setState({
                  todos: res.data,
                })
              );
          });
        break;
      case 'update':
        axios.post('/api/TodoItems',
          {
            name: state.text,
            priority: state.priority,
            todoItemId: state.id,
            completed: state.completed,
          })
          .then(() => {
            axios.get('/api/TodoItems')
              .then(res =>
                this.setState({
                  todos: res.data,
                })
              );
          });
        break;
      default:
        break;
    }
  }
  sort(type) {
    if (type === this.state.sort) return;

    const array = [...this.state.todos];
    switch (type) {
      case 'id':
        array.sort((a, b) => a.todoItemId - b.todoItemId);
        break;
      case 'priority':
        array.sort((a, b) => a.priority - b.priority);
        break;
      default:
        break;
    }
    this.setState({
      todos: array,
      sort: type,
    });
  }

  render() {
    return (
      <div className='container'>
        <div className='page-header'>
          <h1>Very Simple Todo App</h1>
          <h3>Track all of the things</h3>
        </div>

        <div className='row'>
          <div className='col-4'>
            <div className='card bg-light'>
              <div className='card-header'>Add a new Todo</div>
              <div className='card-body bg-white'>
                <form>
                  <p>I want to...</p>
                  <textarea
                    className='create-todo-text form-control'
                    id='currentText'
                    onChange={ e => this.update(e) }
                  />
                  <p>How much of a priority is this?</p>
                  <select
                    className='create-todo-priority form-control'
                    id='currentPriority'
                    onChange={ e => this.update(e) }
                  >
                    <option value='1'>Low</option>
                    <option value='2'>Medium</option>
                    <option value='3'>High</option>
                  </select>
                </form>
              </div>
              <div className='card-footer'>
                <button
                  className='btn btn-success col create-todo'
                  onClick={ () => this.createTodo() }
                >Add</button>
              </div>
            </div>
          </div>

          <div className='col-8'>
            <div className='card bg-light'>
              <div className='card-header'>
                <p>View Todos</p>
              </div>
              <div className='card-body'>
                <ul className='list-group'>
                  {this.state.todos.map(todo => (
                    <TodoItem
                      key={ todo.todoItemId }
                      data={ todo }
                      update={ (type, state) => this.updateTodo(type, state) }
                    />
                  ))}
                </ul>
              </div>

              <div className='card-footer'>
                <div className='btn-group' role='group'>
                  <button
                    type='button' className='btn btn-info' onClick={ () => this.sort('priority') }
                  >Sort by Priority</button>
                  <button
                    type='button' className='btn btn-info' onClick={ () => this.sort('id') }
                  >Sort by Id</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
