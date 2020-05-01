import React, { useState } from 'react';
import TodoList from './Todo/TodoList';
import Context from './context';
import Modal from './Modal/Modal';
import get from 'lodash.get';
import set from 'lodash.set';

import './style.css';

const App = () => {
    const [todos, setTodos] = useState([
        {
            title: 'Test',
            id: 666,
            completed: false,
            children: [
                {
                    title: 'Sub Test',
                    id: 667,
                    completed: false,
                    children: []
                },
                {
                    title: 'Sub Test 1',
                    id: 66,
                    completed: false,
                    children: [
                        {
                            title: 'Sub Sub Test 1',
                            id: 66237,
                            completed: false,
                            children: []
                        },
                        {
                            title: 'Sub Sub Test 1',
                            id: 6643,
                            completed: false,
                            children: []
                        }
                    ]
                },
                {
                    title: 'Sub Test 2',
                    id: 67,
                    completed: false,
                    children: [
                        {
                            title: 'Sub Sub Test 2',
                            id: 4667,
                            completed: false,
                            children: []
                        },
                        {
                            title: 'Sub Sub Test 2',
                            id: 266,
                            completed: false,
                            children: []
                        },
                        {
                            title: 'Sub Sub Test 2',
                            id: 367,
                            completed: false,
                            children: []
                        }
                    ]
                }
            ]
        }
    ]);

    const toggleTodo = (id, parents = '', parentCompleted = false) => {
        editElement(parents, (todos) => {
            const formattedTodos = [...todos];
            todos.forEach((todo, index) => {
                if (todo.id === id) {
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

    const addTodo = (title) => {
        setTodos(
            todos.concat([
                {
                    title,
                    id: Date.now(),
                    completed: false,
                    children: []
                }
            ])
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
                <Modal addTodo={addTodo} />
                {todos.length ? <TodoList todos={todos} /> : <p>No todos!</p>}
            </div>
        </Context.Provider>
    );
};

export default App;
