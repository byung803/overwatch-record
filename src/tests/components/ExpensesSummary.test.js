import React from 'react';
import { shallow } from 'enzyme'; 
import { ExpensesSummary } from '../../components/ExpensesSummary';
import expenses from '../fixture/expenses';

test('should show count and amount of single expense', () => {
    const expensesCount = 1;
    const expensesTotal = 9434; 
    const wrapper = shallow(<ExpensesSummary expensesCount={expensesCount} expensesTotal={expensesTotal} />);
    expect(wrapper).toMatchSnapshot(); 
});

test('should show count and amount of multiple expenses', () => {
    const expensesCount = 2;
    const expensesTotal = 9434; 
    const wrapper = shallow(<ExpensesSummary expensesCount={expensesCount} expensesTotal={expensesTotal} />);
    expect(wrapper).toMatchSnapshot(); 
});


