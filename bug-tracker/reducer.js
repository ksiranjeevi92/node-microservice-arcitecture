import * as actions from './actionTypes';

let lastId = 0;

export default function reducer(state=[],action){
    switch(action.type){
        case actions.BUG_ADDED:
            return [
                ...state,
                {
                    id: lastId++,
                    description: action.payload.description,
                    resolved: false
                }
            ]
        case actions.BUG_REMOVED:
            return filter.state(elm => elm.id != action.payload.id)
        default:
            return state
    }
}