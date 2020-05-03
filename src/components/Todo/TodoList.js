import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const styles = {
    ul: {
        listStyle: 'none',
        margin: '1rem 0',
        padding: 0
    },
    subUl: {
        listStyle: 'none',
        margin: 0,
        marginLeft: '1rem',
        padding: 0
    }
};

const TodoList = ({ onToggle, todos, isSub, parents = '' }) => {
    return (
        <ul style={isSub ? styles.subUl : styles.ul}>
            {todos
                ? todos.map((todo, index) => {
                      return (
                          <React.Fragment key={todo.id}>
                              <TodoItem
                                  todo={todo}
                                  index={index}
                                  parents={parents}
                              />
                              <TodoList
                                  onToggle={onToggle}
                                  todos={todo.children}
                                  isSub={true}
                                  parents={`${parents}[${index}].children`}
                              />
                          </React.Fragment>
                      );
                  })
                : null}
        </ul>
    );
};

TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default TodoList;
