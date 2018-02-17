import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { 
    startAddExpense, 
    addExpense, 
    editExpense, 
    removeExpense,
    setExpenses,
    startSetExpenses, 
    startRemoveExpense,
    startEditExpense
} from '../../actions/expenses';
import expenses from '../fixture/expenses';
import database from '../../firebase/firebase'; 
import { defaultCipherList } from 'constants';

const uid = 'thisismytestuid'; 
const defaultAuthState = { auth: { uid } }; 
const createMockStore = configureMockStore([thunk]); 

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expensesData[id] = { description, note, amount, createdAt }; 
    });
    
    database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done()); 
});

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc' }); 
    expect(action).toEqual({
            type: 'REMOVE_EXPENSE',
            id: '123abc'
        });
    // expect(action).toMatchObject({
    //     type: 'REMOVE_EXPENSE',
    //     id: '123abc'
    // });
});

test('should remove expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthState); 
    store.dispatch(startRemoveExpense(expenses[1]))
        .then(() => {
            const actions = store.getActions(); 
            expect(actions[0]).toEqual({
                type: 'REMOVE_EXPENSE',
                id: expenses[1].id
            });
            return database.ref(`users/${uid}/expenses/${expenses[1].id}`).once('value');
        }).then((snapshot) => {
            expect(snapshot.val()).toBeFalsy();
            done();
        });
});

test('editExpense 는 type, id, updates를 action으로 보내야한다.', () => {
    const action = editExpense('123abc', { note: 'New note value' });
    expect(action).toEqual({ 
        type: 'EDIT_EXPENSE',   
        id: '123abc',     
        updates: { 
            note: 'New note value' 
        } 
    });
});

test('should edit expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[2].id; 
    const updates = {
        description: 'new updates',
        note: 'hi im updates'
    }
    store.dispatch(startEditExpense(id, updates))
        .then(() => {            
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: 'EDIT_EXPENSE',
                id,
                updates: {
                    description: 'new updates',
                    note: 'hi im updates'
                }
            });
            
            return database.ref(`users/${uid}/expenses/${id}`).once('value');
        }).then((snapshot) => {
            expect(snapshot.val()).toEqual({
                description: 'new updates',
                note: 'hi im updates',
                amount: expect.any(Number),
                createdAt: expect.any(Number)
            });
            done();
        });
        
});


test('should setup add Expense action object with provided values', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });    
});

test('should add expense to database and store', (done) => {
    const store = createMockStore(defaultAuthState)
    const expenseData = {
        description: 'Mouse',
        amount: 3000, 
        note: 'This one is better',
        createdAt: 1000
    };

    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions(); 
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData); 
        done();
    });        
});

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const expenseDefault = {
        description: '', 
        note: '', 
        amount: 0, 
        createdAt: 0  
    };

    store.dispatch(startAddExpense()).then(() => {
        const actions = store.getActions(); 
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseDefault
            }
        });

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseDefault); 
        done();
    });
});

test('should setup set expense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('should fetch the expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions(); 
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });

});



// test('should setup add expense action object with default values', () => {
//     const action = addExpense();
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             description: '',
//             note: '',
//             amount: 0,
//             createdAt: 0,
//             id: expect.any(String)     
//         }    
//     });    
// });