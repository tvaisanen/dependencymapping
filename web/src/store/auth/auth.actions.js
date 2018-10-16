import * as types from './auth.action-types';

export function loginSuccess(user){
    return {type: types.LOG_IN_USER, user};
}

export function logout(){
    return {type: types.LOGOUT_USER};
}