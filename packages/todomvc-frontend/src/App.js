import React, { Component } from "react";
import "todomvc-app-css/index.css";
import "./App.css";
import FooterToolbar from "./FooterToolbar";
import FooterInfo from "./FooterInfo";
import TodoItem from "./TodoItem";
import { getTodos, createTodo, updateTodo, deleteTodo } from './api/todos';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodo: '',
      filter: 'all',
      todos: [],
    };
  }

  async componentDidMount() {
    const todos = await getTodos();
    this.setState({ todos });
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

  handleKeydown = async evt => {
    if (evt.keyCode === 13 /* Return */ && this.state.newTodo) {
      const todo = await createTodo(this.state.newTodo);

      this.setState({
        newTodo: '',
        todos: this.state.todos.concat([todo]),
      });
    }
  };

  handleToggle = async todoId => {
    const todoPromises = this.state.todos.map(todo => {
      if (todo.id !== todoId) {
        return Promise.resolve(todo);
      }

      return updateTodo({ ...todo, completed: !todo.completed, });
    });

    this.setState({
      todos: await Promise.all(todoPromises),
    });
  };

  handleUpdate = async (todoId, title) => {
    const todoPromises = this.state.todos.map(todo => {
      if (todo.id !== todoId) {
        return Promise.resolve(todo);
      }

      return updateTodo({ ...todo, title });
    });

    this.setState({
      todos: await Promise.all(todoPromises),
    })
  };

  handleDelete = async todoId => {
    await deleteTodo(todoId);

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
