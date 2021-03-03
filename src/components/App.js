import React, { useState } from 'react';
import TodoList from './Todo/TodoList';
import AddTodo from './Todo/AddTodo';
import Context from './context';
import get from 'lodash.get';
import set from 'lodash.set';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

const App = () => {
    const [todos, setTodos] = useState([]);

    const toggleTodo = (id, parents = '', parentCompleted = false) => {
        editElement(parents, (todos) => {
            const formattedTodos = [...todos];
            todos.forEach((todo, index) => {
                if (todo.id === id) {
                    // sadasd
                    todo.completed = !todo.completed;
                    toggleTodo(
                        null,
                        `${parents}[${index}].children`,
                        todo.completed
                    );
                    todo.completed
                        ? formattedTodos.push(todo) &&
                          formattedTodos.splice(index, 1)
                        : (formattedTodos[index] = todo);
                }

                if (!id) {
                    todo.completed = parentCompleted;
                    toggleTodo(
                        null,
                        `${parents}[${index}].children`,
                        parentCompleted
                    );
                    formattedTodos[index] = todo;
                }
            });
            return formattedTodos;
        });
    };

    const removeTodo = (id, parents = '') => {
        editElement(parents, (todos) => todos.filter((todo) => todo.id !== id));
    };

    const addTodo = (title, parents) => {
        const newItem = [
            {
                title,
                id: Date.now(),
                completed: false,
                children: []
            }
        ];
        editElement(parents, (todos) =>
            todos ? todos.concat(newItem) : newItem
        );
    };

    const editElement = (path, edit) => {
        const newTodos = Object.assign([], todos);
        let todosLevel = path ? get(newTodos, path) : newTodos;

        todosLevel = edit(todosLevel);
        setTodos(path ? set(newTodos, path, todosLevel) : todosLevel);
    };

    return (
        <Context.Provider value={{ removeTodo, toggleTodo }}>
            <div className="wrapper">
                <h1>Todo List</h1>
                <AddTodo onCreate={addTodo} todos={todos} />
                {todos.length ? (
                    <TodoList todos={todos} />
                ) : (
                    <p className="empty-list">No todos!</p>
                )}
            </div>
        </Context.Provider>
    );
};

export default App;
