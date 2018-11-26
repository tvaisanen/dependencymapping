import * as types from './auth.action-types';


const initialAuth = {
    loggedIn: false,
    ...JSON.parse(localStorage.getItem('auth'))
};


export default function(state=initialAuth, action){
    switch (action.type){
        case types.LOG_IN_USER:
            console.info(`auth.reducer :: LOG_IN_USER :: ${JSON.stringify(action.user)}`);
            // local storage is used that the auth is remembered
            localStorage.setItem('auth', JSON.stringify(action.user));
            return {...action.user, loggedIn: true};
        case types.LOGOUT_USER:
            localStorage.setItem('auth', null);
            return {loggedIn: false};
        default:
            return state;
    }
}