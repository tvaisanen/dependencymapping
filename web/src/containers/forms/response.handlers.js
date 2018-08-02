
export function handleResponse({response, setDetail, detailType, setView, closeForm}) {

    console.info('handleResponse()');
    console.info(response);

    const status = response.status;

    if (200 <= status && status < 300) {
        return handleResponseSuccess({response, setDetail, detailType, setView, closeForm});
    } else if (400 <= status && status < 600) {
        return handleError(response)
    }
}

export function handleError(response) {
    console.info(response);
    const status = response.status;
    console.info('handle error');
    console.info(response);
    if (400 <= status && status < 500) {
        return handleClientSideError(response);

    } else if (400 <= status && status < 500) {
        return handleServerSideError();
    }
}

function handleResponseSuccess({response, setDetail, detailType, setView, closeForm}) {
    let setDetailTo = "";
    switch (response.status) {
        case 200:
            console.info("handle 200");
            setDetailTo = response.data.name;
            break;

        case 201:
            console.info("handle 201");
            setDetailTo = response.data.name;
            break;

        case 204:
            setDetailTo = "EMPTY";
            break;

        default:
            break;
    }

    setDetail({detail: setDetailTo, type: detailType}); // set detail for new mapping
    setView(0);
    closeForm();
}

function handleClientSideError(response) {
    console.info("client side error");
    console.info(response.data);
    return {error: response.data};
}

function handleServerSideError() {

}