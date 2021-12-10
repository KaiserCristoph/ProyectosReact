import { types } from '../types/types';

const manufacturerReducer = (state = {}, action) =>{
    switch (action.type) {
        case types.manufacturerAdd:
            return{
                ...state,
                manufacturerAdded: {
                    ...action.payload
                }
            }
        case types.manufacturerActive:
            return{
                ...state,
                active: {
                    ...action.payload
                }
            }
        default:
            return state;
    }
};

export {
    manufacturerReducer
}