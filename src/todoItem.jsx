import React, { Component } from 'react';

class TodoItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: props.text,
      priority: props.priority,
      id: props.id,
      completed: props.completed,
      color: this.getColor(props.priority),
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

  getColor(priority) {
    switch (priority) {
      case '1':
        return 'success';
      case '2':
        return 'warning';
      case '3':
        return 'danger';
      default:
        return 'dark';
    }
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  toggleEdit() {
    this.setState({
      isEditing: !this.state.isEditing,
      color: this.getColor(this.state.priority),
    });
    if (!this.state.isEditing){
      this.props.update('update', this.props.id, this.state);
    }
  }

  update(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
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
              <span className='glyphicon glyphicon-edit' />
            </button>
            <button className='delete-todo' onClick={ () => this.props.update('delete', this.props.id, {}) }>
              <span className='glyphicon glyphicon-trash' />
            </button>
          </p>
        </div>
      </li>
    );
  }
}

export default TodoItem;
