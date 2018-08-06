import initialState from './initialState';

export default function ( state = initialState.app, action ){
    switch(action.type){
        default:
            return state;
    }
}