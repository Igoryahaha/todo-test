import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const useInputValue = (defaultValue = '') => {
    const [value, setValue] = useState(defaultValue);

    return {
        bind: {
            value,
            onChange: (event) => setValue(event.target.value)
        },
        clear: () => setValue(''),
        value: () => value
    };
};

const getParents = (todos, result = [], parents = '', level = 0) => {
    if (level < 2) {
        todos.forEach((item, index) => {
            result.push({
                title: item.title,
                parent: `${parents}[${index}].children`
            });
            result = getParents(
                item.children,
                result,
                `${parents}[${index}].children`,
                ++level
            );
        });
    }
    return result;
};

function AddTodo({ onCreate, todos }) {
    const [show, setShow] = useState(false);
    const input = useInputValue('');
    const select = useInputValue('');

    const handleClose = () => {
        input.clear();
        select.clear();
        setShow(false);
    };
    const handleShow = () => setShow(true);
    const handleAdd = (event) => {
        if (input.value().trim()) {
            event.preventDefault();
            onCreate(
                input.value(),
                select.value() === 'root' ? '' : select.value()
            );
            input.clear();
            select.clear();
            setShow(false);
        }
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add element
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title>Add settings</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="title-todo">
                            <Form.Label>TODO content</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter todo"
                                required
                                {...input.bind}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Enter parent</Form.Label>
                            <Form.Control as="select" {...select.bind}>
                                <option value="">root</option>
                                {getParents(todos).map((item, index) => (
                                    <option
                                        key={`${index}-${item.title}`}
                                        value={item.parent}
                                    >
                                        {item.title}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleAdd}
                            type="submit"
                        >
                            Add
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

AddTodo.propTypes = {
    onCreate: PropTypes.func.isRequired,
    todos: PropTypes.array
};

export default AddTodo;
