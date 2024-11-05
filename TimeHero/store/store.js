import { configureStore } from 'redux';

// Initial state
const initialState = {
    user: null,
};

// Reducer function
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload };
        default:
            return state;
    }
};

// Create store
const store = configureStore(reducer);

export default store;
