import React, { useContext, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Context from '../context';

const styles = {
    li: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '.5rem 1rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginBottom: '.5rem'
    },
    input: {
        marginRight: '1rem'
    }
};

const TodoItem = ({ todo, parents }) => {
    const [show, setShow] = useState(false);
    const { removeTodo, toggleTodo } = useContext(Context);
    const classes = [];

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const handleDelete = () => {
        setShow(false);
        removeTodo(todo.id, parents);
    };
    if (todo.completed) {
        classes.push('done');
    }

    return (
        <React.Fragment>
            <li style={styles.li}>
                <span className={classes.join(' ')}>
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        style={styles.input}
                        onChange={() => toggleTodo(todo.id, parents)}
                    />
                    &nbsp;
                    {todo.title}
                </span>

                {todo.completed ? (
                    <button className="rm" onClick={handleShow}>
                        delete
                    </button>
                ) : null}
            </li>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete {todo.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleDelete}
                        type="submit"
                    >
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
};

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired
};

export default TodoItem;
