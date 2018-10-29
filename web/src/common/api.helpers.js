export function isNetworkError(error){
    return error.message && error.message === "Network Error";
}
export function handleNetworkError(error){

    return function (dispatch, getState) {
        console.group("handleNetworkError");
        dispatch();
        console.info(error);
        console.info(dispatch);
        console.info(getState);
        console.groupEnd();
    }
}