
export function handleNetworkError(error){

    return function (dispatch, getState) {
        console.group("handleNetworkError");
        console.info(error);
        console.info(dispatch);
        console.info(getState);
        console.groupEnd();
    }
}