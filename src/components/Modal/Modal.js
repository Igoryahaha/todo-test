import React, { PureComponent } from 'react';
import AddTodo from '../Todo/AddTodo';
import './style.css';

export default class Modal extends PureComponent {
    constructor() {
        super();
        this.state = {
            isOpen: false
        };
    }

    closeModal = () => {
        this.setState({ isOpen: false });
    };

    render() {
        return (
            <React.Fragment>
                <button onClick={() => this.setState({ isOpen: true })}>
                    Open modal
                </button>

                {this.state.isOpen && (
                    <div className="modal">
                        <div className="modal-body">
                            <h1>Add element</h1>

                            <AddTodo
                                onCreate={this.props.addTodo}
                                closeModal={this.closeModal}
                            />
                            <button onClick={this.closeModal}>Close</button>
                        </div>
                    </div>
                )}
            </React.Fragment>
        );
    }
}
