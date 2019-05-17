import React, { Component } from 'react';
import PropTypes from 'prop-types';

const colors = ['success', 'warning', 'danger', 'dark'];

export default class TodoItem extends Component {
  constructor(props) {
    super(props);
    const color = colors[this.props.data.priority - 1];

    this.state = {
      text: props.data.name,
      priority: props.data.priority,
      id: props.data.todoItemId,
      completed: props.data.completed,
      color,
      isEditing: false,
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  toggleEdit() {
    this.setState({
      isEditing: !this.state.isEditing,
      color: colors[this.state.priority - 1],
    });
    if (!this.state.isEditing) {
      this.props.update('update', this.state);
    }
  }

  update(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  delete() {
    this.props.update('delete', this.state);
  }

  render() {
    if (this.state.isEditing) {
      return (
        <li className={ `list-group-item list-group-item-${this.state.color}` } >
          <p>Description</p>
          <textarea className='update-todo-text' id='text' onChange={ e => this.update(e) } />
          <p>Priority</p>
          <select className='update-todo-priority' id='priority' onChange={ e => this.update(e) }>
            <option value='1'>Low</option>
            <option value='2'>Medium</option>
            <option value='3'>High</option>
          </select>
          <button className='update-todo bg-green' onClick={ () => this.toggleEdit() }>Save</button>
        </li>
      );
    }
    return (
      <li className={ `list-group-item list-group-item-${this.state.color}` } >
        <div className='row'>
          <p>
            <input type='checkbox' id='completed' onClick={ e => this.update(e) } />
            {this.state.text}
            <button className='edit-todo' onClick={ () => this.toggleEdit() }>
              <span className='fas fa-edit' />
            </button>
            <button className='delete-todo' onClick={ () => this.delete() }>
              <span className='fas fa-trash-alt' />
            </button>
          </p>
        </div>
      </li>
    );
  }
}
TodoItem.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    priority: PropTypes.string,
    todoItemId: PropTypes.number,
    completed: PropTypes.bool,
  }),
  update: PropTypes.func,
};
