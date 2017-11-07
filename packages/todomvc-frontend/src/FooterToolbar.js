import React from 'react';

/**
 * @return {null}
 */
function FooterToolbar(props) {
  const itemsLeft = props.allCount - props.completedCount;

  if (props.allCount === 0) {
    return null;
  }

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{itemsLeft}</strong> item left
      </span>
      <ul className="filters">
        <li>
          <a href="#/"
             className={props.filter === 'all' ? 'selected' : null}
             onClick={() => props.onFilterChange('all')}>
            All
          </a>
        </li>
        <li>
          <a href="#/active"
             className={props.filter === 'active' ? 'selected' : null}
             onClick={() => props.onFilterChange('active')}>
            Active
          </a>
        </li>
        <li>
          <a href="#/completed"
             className={props.filter === 'completed' ? 'selected' : null}
             onClick={() => props.onFilterChange('completed')}>
            Completed
          </a>
        </li>
      </ul>

      <button className="clear-completed" onClick={() => props.onClearCompleted()}>
        Clear completed
      </button>
    </footer>
  );
}

export default FooterToolbar;
