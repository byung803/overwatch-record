import authReducer from '../../reducers/auth';

test('should set default state', () => {
    const state = authReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({});
});

test('should set uid by login', () => {
    const uid = 'test_uid';
    const action = {
        type: 'LOGIN',
        uid
    };
    const state = authReducer({}, action);
    expect(state).toEqual({
        uid: 'test_uid' 
    }); 
});

test('should set {} by logout', () => {
    const auth = { uid: 'test_uid2'};
    const action = {
        type: 'LOGOUT'
    };
    const state = authReducer(auth, action);
    expect(state).toEqual({});
});