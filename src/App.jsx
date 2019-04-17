import React, { Component } from 'react';
import TodoItem from './todoItem';

class App extends Component {
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
    let array = [...this.state.todos];
    array.push(
      {
        text: this.state.currentText,
        priority: this.state.currentPriority,
        id: this.state.id,
        completed: false,
        color: '',
        isEditing: false,
      });
    this.setState({
      todos: array,
      id: this.state.id + 1,
    });
  }
  update(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }
  updateTodo(type, index, state) {
    let array = [...this.state.todos];
    for (let i = 0; i < array.length; i++) {
      if (array[i].id == index) {
        switch (type) {
          case 'delete':
            array.splice(i, 1);
            break;
          case 'update':
            array[i] = state;
            break;
          default:
            break;
        }
        this.setState({
          todos: array,
        });
        return;
      }
    }
  }
  sort(type) {
    if (type == this.state.sort) return;

    let array = [...this.state.todos];
    console.log(this.state.todos[0]);
    console.log(array[0]);
    switch (type) {
      case 'id':
        array.sort((a, b) => a.id - b.id);
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
          <div className='col-4 well'>
            <div className='panel panel-default bg-light'>
              <div className='panel-heading'>Add a new Todo</div>
              <div className='panel-body bg-white'>
                <p>I want to...</p>
                <textarea
                  className='create-todo-text'
                  id='currentText'
                  onChange={ e => this.update(e) }
                />
                <p>How much of a priority is this?</p>
                <select
                  className='create-todo-priority'
                  id='currentPriority'
                  onChange={ e => this.update(e) }
                >
                  <option value='1'>Low</option>
                  <option value='2'>Medium</option>
                  <option value='3'>High</option>
                </select>
              </div>
              <div className='panel-footer'>
                <button
                  className='create-todo'
                  onClick={ () => this.createTodo() }
                >Add</button>
              </div>
            </div>
          </div>
          <div className='col-8'>
            <div className='panel panel-default bg-light'>
              <div className='panel-heading'>
                <p>
                  View Todos
                  <button onClick={ () => this.sort('priority') }>Sort by Priority</button>
                  <button onClick={ () => this.sort('id') }>Sort by Id</button>
                </p>
              </div>
              <div className='panel-body'>
                <ul className='list-group'>
                  {this.state.todos.map(todo => (
                    <TodoItem
                      key={ todo.id }
                      text={ todo.text }
                      priority={ todo.priority }
                      id={ todo.id }
                      completed={ todo.completed }
                      update={ this.updateTodo }
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
