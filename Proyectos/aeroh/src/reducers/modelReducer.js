import { types } from '../types/types';

const modelReducer = (state = {}, action) =>{
    switch (action.type) {
        case types.modelAdd:
            return{
                ...state,
                modelAdded: {
                    ...action.payload
                }
            }
        case types.modelActive:
            return{
                ...state,
                active: {
                    ...action.payload
                }
            }
        case types.modelDelete:
            return {
                ...state,
                active: null,
                modelAdded: null
            } 
        default:
            return state;
    }
};

export {
    modelReducer
}