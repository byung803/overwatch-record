import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { startRemoveExpense } from '../actions/expenses';

export class RemoveModal extends Component {

    onRemove = () => {
        this.props.startRemoveExpense(this.props.expense);
        this.props.history.push('/dashboard');
    }

    render() {
        return (
            <Modal
                isOpen={this.props.modalToggler}
                contentLabel="Remove Modal"
                onRequestClose={this.props.closeModal}
                closeTimeoutMS={200}
                className="modal"
            >
                <h3 className="modal__title">Are you sure to Remove this Expense?</h3>
                <button
                    className="button button--remove"
                    onClick={this.onRemove}
                >
                    Remove
                </button>
                <button
                    className="button"
                    onClick={this.props.closeModal}
                >
                    Cancel
                </button>
            </Modal>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    startRemoveExpense: (expense) => dispatch(startRemoveExpense(expense))
});

export default connect(undefined, mapDispatchToProps)(RemoveModal); 