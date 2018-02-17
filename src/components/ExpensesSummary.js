import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expensesTotal';

export const ExpensesSummary = (props) => {
    const expenseWord = props.expensesCount === 1 ? '게임' : '게임';

    return (
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">
                    <span>{props.expensesCount}</span> {expenseWord} 결과 전체 메달 <span>{props.expensesTotal / 100}개</span>
                </h1>
                <div className="page-header__actions">
                    <Link className="button" to="/create">Add Game</Link>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => ({
    expensesCount: selectExpenses(state.expenses, state.filters).length,
    expensesTotal: selectExpensesTotal(selectExpenses(state.expenses, state.filters))
});

export default connect(mapStateToProps)(ExpensesSummary);