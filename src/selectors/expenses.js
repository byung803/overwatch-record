import moment from 'moment';
// Get visible expenses

export default (expenses, { text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        const createdAtMoment = moment(expense.createdAt); 
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true ; 
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true; 
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase()); 
       
        return startDateMatch && endDateMatch && textMatch; 
    }).sort((a, b) => {
        if(sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;  
        } else if(sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1; 
        }
    });
};

/**
 * if (a.createdAt < b.createdAt) = 1  b가 먼저나옴
 * if (a.createdAt > b.createdAt) = -1 a가 먼저나옴
 * 결국 큰게 먼저 나옴. createdAt이 크다 = 날짜 큰게 먼저 나온다. 
 */