import React from 'react';
import classNames from 'classnames';

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      editTitle: ''
    };
  }

  render() {
    const todo = this.props.todo;

    let todoClasses = classNames({
      completed: todo.completed,
      editing: this.state.editing,
    });

    return (
      <li className={todoClasses}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={() => this.props.onToggle(todo.id)}
          />
          <label onDoubleClick={this.handleDoubleClick}>{todo.title}</label>
          <button className="destroy" onClick={() => this.props.onDelete(todo.id)}/>
        </div>
        <input
          className="edit"
          value={this.state.editTitle}
          autoFocus={this.state.editing}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
      </li>
    );
  }

  handleDoubleClick = () => {
    this.setState({
      editing: true,
      editTitle: this.props.todo.title,
    });
  };

  handleChange = (evt) => {
    this.setState({
      editTitle: evt.target.value,
    });
  };

  handleKeyDown = (evt) => {
    switch (evt.keyCode) {
      case 13: // Return
        this.props.onUpdate(this.props.todo.id, this.state.editTitle);
        this.setState({editing: false});
        break;
      case 27: // Esc
        this.setState({editing: false});
        break;
      default:
        break;
    }
  };
}

export default TodoItem;
