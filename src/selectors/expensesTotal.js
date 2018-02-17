export default (expenses = -1) => {
    if(expenses === -1) {
        return 0;
    }

    return expenses.map((expense) => {
        return expense.amount; 
    }).reduce((sum, cur) => {
        return sum + cur
    }, 0);
}