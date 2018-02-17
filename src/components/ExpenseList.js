import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

export const ExpenseList = (props) => (
    <div className="content-container">
        <div className="list-header">
            <div className="show-for-mobile">Games</div>
            <div className="show-for-desktop">Game</div>
            <div className="show-for-desktop">Medal</div>
        </div>
        <div className="list-body">
            {
                props.expenses.length === 0 ? (
                    <div className="list-item list-item--message">
                        <span >No Games</span>
                    </div>
                ) : (
                        props.expenses.map((expense, i) => {
                            return (
                                <ExpenseListItem key={expense.id} expense={expense} />
                            );
                        })
                    )
            }
        </div>
    </div>
);

const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters),
    };
};


export default connect(mapStateToProps)(ExpenseList); 
