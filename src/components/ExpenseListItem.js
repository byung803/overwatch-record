import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const ExpenseListItem = (props) => {
    return (
        <Link className="list-item" to={`/edit/${props.expense.id}`}>
            <div>
                <h3 className="list-item__title">{`${props.expense.description}`}</h3>
                <span className="list-item__subtitle">
                    {moment(props.expense.createdAt).format('YYYY년 MM월 D일')}
                </span>
            </div>
            <h3 className="list-item__data">메달 {props.expense.amount / 100}개</h3>
        </Link>
    )
}

export default ExpenseListItem;