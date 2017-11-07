import React, { Component } from "react";
import uuid from 'uuid';
import "todomvc-app-css/index.css";
import "./App.css";
import FooterToolbar from "./FooterToolbar";
import FooterInfo from "./FooterInfo";
import TodoItem from "./TodoItem";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodo: '',
      filter: 'all',
      todos: [],
    };
  }

  render() {
    return (
      <div>
        <section className="todoapp">
          <header className="header">
            <h1>todos</h1>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              autoFocus
              value={this.state.newTodo}
              onChange={this.handleChange}
              onKeyDown={this.handleKeydown}
            />
          </header>

          <section className="main">
            <input className="toggle-all" type="checkbox" />
            <label htmlFor="toggle-all">
              Mark all as complete
            </label>
            <ul className="todo-list">
              {this.getTodos(this.state.filter).map(todo =>
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={this.handleToggle}
                  onUpdate={this.handleUpdate}
                  onDelete={this.handleDelete}
                />
              )}
            </ul>
          </section>

          <FooterToolbar
            filter={this.state.filter}
            allCount={this.getTodos('all').length}
            completedCount={this.getTodos('completed').length}
            onFilterChange={this.handleFilterChange}
            onClearCompleted={this.handleClearCompleted}
          />
        </section>
        <FooterInfo />
      </div>
    );
  }

  handleChange = (evt) => {
    this.setState({
      newTodo: evt.target.value
    });
  };

  handleKeydown = (evt) => {
    if (evt.keyCode === 13 /* Return */ && this.state.newTodo) {
      const todo = {
        id: uuid.v4(),
        title: this.state.newTodo,
        completed: false,
      };

      this.setState({
        newTodo: '',
        todos: this.state.todos.concat([todo]),
      });
    }
  };

  handleToggle = (todoId) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id !== todoId) {
          return todo;
        }

        return { ...todo, completed: !todo.completed, };
      }),
    })
  };

  handleUpdate = (todoId, title) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id !== todoId) {
          return todo;
        }

        return { ...todo, title };
      }),
    })
  };

  handleDelete = (todoId) => {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== todoId),
    })
  };

  handleFilterChange = filter => {
    this.setState({
      filter: filter,
    });
  };

  handleClearCompleted = () => {

  };

  getTodos = filter => {
    const todos = this.state.todos;
    switch (filter) {
      case 'all':
        return todos;
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        throw Error('Invalid filter.')
    }
  }
}

export default App;
