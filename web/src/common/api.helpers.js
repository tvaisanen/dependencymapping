import * as appActions from '../actions/app.actions';

export function isNetworkError(error){
    return error.message && error.message === "Network Error";
}
export function handleNetworkError(error){

    return function (dispatch, getState) {
        dispatch(appActions.setInfoMessage("Network Error: try visiting https://api.localhost"));
        console.group("handleNetworkError");
        console.info(error);
        console.info(dispatch);
        console.info(getState);
        console.groupEnd();
    }
}