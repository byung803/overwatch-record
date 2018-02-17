import { createStore } from 'redux';

// Action generators - functions that return action objects

const incrementCount = ({ incrementBy = 1 } = {} ) => ({
    type: 'INCREMENT',
    incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
    type: 'DECREMENT',
    decrementBy
});

const reset = () => ({
    type: 'RESET'    
});

const set = ({ count = 101} = {}) => ({
    type: 'SET',
    count
});

//Reducers 
//1. Reducers are pure function
//2. Never change state or action 

let a = 10;
const add = (b) => {
    return a+b;
};

const countReducer = (state = { count: 0 }, action) => {
    switch (action.type) {
    case 'INCREMENT':       
        return {
            count: state.count + action.incrementBy 
        };
    case 'DECREMENT': 
        return {
            count: state.count - action.decrementBy
        };
    case 'RESET':
        return {
            count: 0
        };
    case 'SET': 
        return {
            count: action.count
        };
    default:    
        return state;     
    }
};

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
    console.log(store.getState()); 
});



// Actions - than an object hat gets sent to the store 

// I'd like to increment the count 
// store.dispatch({
//     type: 'INCREMENT',
//     incrementBy: 5
// });

//INCREMENT
store.dispatch(incrementCount({ incrementBy: 15 }));

//I'd like to reset the count to zero 
store.dispatch(incrementCount());

// RESET - set the count = 0 

store.dispatch(reset());

// DECREMENT
store.dispatch(decrementCount());
store.dispatch(decrementCount({ decrementBy: 10 }));

// SET 

store.dispatch(set({ count: 202 }));
store.dispatch(set());