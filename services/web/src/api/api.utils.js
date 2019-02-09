import { setInfoMessage } from '../store/ui/ui.actions';

export function isNetworkError(error){
    return error.message && error.message === "Network Error";
}
export function handleNetworkError(error){

    console.info(error.response)

    return function (dispatch, getState) {
        dispatch(setInfoMessage("Network Error: try visiting https://api.localhost"));
        console.group("handleNetworkError");
        console.info(error);
        console.info(dispatch);
        console.info(getState);
        console.groupEnd();
    }
}