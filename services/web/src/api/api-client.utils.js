import ApiResponse from './ApiResponse';


export function createApiResponse(promise, config) {

    return new Promise((resolve, reject) => {

        promise
            .then(response => {

                Object.setPrototypeOf(
                    response,
                    new ApiResponse(response, config)
                );

                console.groupCollapsed(
                    `  %cOK\t%cAPI::${response.config.method}:${response.config.url}`,
                    "color: green",
                    "color:black"
                );

                console.info(response);
                console.groupEnd();

                resolve(response);
            })
            .catch(err => {

                console.groupCollapsed(
                    `%c\tERROR %cAPI::${err.response.config.method}:${err.response.config.url}`,
                    "color: red",
                    "color:black"
                );
                console.info(Object.keys(err));
                console.info(err)
                console.groupEnd();

                reject(err)
            })
            .finally();
    })
}

