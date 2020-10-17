import store from './store';
import * as actions from './actionTypes';


const unsubscribe = store.subscribe(() => {
    console.log(store.getState())
})

store.dispatch({
    type: actions.BUG_ADDED,
    payload: {
        description: 'Hello'
    }
})

store.dispatch({
    type: actions.BUG_REMOVED,
    payload:{
        id: 1
    }
})

unsubscribe();