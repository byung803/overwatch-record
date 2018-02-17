import selectExpensesTotal from '../../selectors/expensesTotal';
import expenses from '../fixture/expenses'

test('should return 0 if no expenses', () => {
    const total = selectExpensesTotal([]);    
    expect(total).toBe(0);
});

test('should correctly add up a single expense', () =>{
    const total = selectExpensesTotal([expenses[0]]);
    // console.log(total);
    expect(total).toBe(195);
});

test('should correctly add up multiple expense', () =>{
    const total = selectExpensesTotal(expenses);
    // console.log(total);
    expect(total).toBe(114195);
});
