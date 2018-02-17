import uuid from 'uuid'; 
import database from '../firebase/firebase'; 

// ADD_EXPENSE
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

export const startAddExpense = ( expenseData = {} ) => {
    return (dispatch,getState) => {
        const uid = getState().auth.uid; 
        const {
            description='', 
            note = '', 
            amount =0, 
            createdAt =0  
        } = expenseData; 
        const expense = { description, note, amount, createdAt }; 
        
        return database.ref(`users/${uid}/expenses`).push(expense).then((snapshot) => {
            dispatch(addExpense({
                id: snapshot.key,
                ...expense
            }));
        });
    };
};

// REMOVE_EXPENSE
export const removeExpense = ({ id  = -1 } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

export const startRemoveExpense = ({ id = -1 }) => {
    // console.log('id', id);
    return (dispatch, getState) => {
        const uid = getState().auth.uid; 
        return database.ref(`users/${uid}/expenses/${id}`).remove()
        .then(() => {
            dispatch(removeExpense({id})); 
        }).catch((e) => {
            console.log('Remove error', e);
        });
    };
};

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

export const startEditExpense = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses/${id}`).update(updates)
        .then(() => { 
            dispatch(editExpense(id, updates));
        });
    };
};

// SET_EXPENSES
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
}); 

export const startSetExpenses = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid; 
        const expenses = []; 
        return database.ref(`users/${uid}/expenses`).once('value')
        .then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
                expenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            // console.log(expenses);
            dispatch(setExpenses(expenses)); 
        });
    };
}; 