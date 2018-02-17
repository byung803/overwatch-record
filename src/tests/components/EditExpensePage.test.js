import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixture/expenses';

let startEditExpense, startRemoveExpense, history, wrapper; 

beforeEach(() => {
    startEditExpense = jest.fn();
    startRemoveExpense = jest.fn(); 
    history = { push: jest.fn() }; 
    wrapper = shallow(
        <EditExpensePage 
            startEditExpense={startEditExpense} 
            startRemoveExpense={startRemoveExpense} 
            history={history} 
            expense={expenses[2]} 
        />);
});

test('should render EditExpensePage', () => {
    expect(wrapper).toMatchSnapshot(); 
});

test('should handle startEditExpense', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[2]);
    expect(startEditExpense).toHaveBeenLastCalledWith(expenses[2].id, expenses[2]);
    expect(history.push).toHaveBeenLastCalledWith('/');  
});

test('should handle startRemoveExpense', () => {
    wrapper.find('button').prop('onClick')();
    //wrapper.find('button').simulate('click'); 위 코드와 동일하다. 
    //onClick 함수를 찾은다음 넣을 argument가 없는 관계로 
    //그냥 click event만 넣어줘도 동일한 역할을 한다. 
    expect(startRemoveExpense).toHaveBeenLastCalledWith(expenses[2]);
    expect(history.push).toHaveBeenLastCalledWith('/');
});