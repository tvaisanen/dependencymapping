class ApiResponse {
    constructor(serverPromise, config = {}) {
        this.config = config;
        this.promise = serverPromise;
    }

    async parseResponseContent() {
        //? all actions migrated to use this?
        //  console.groupCollapsed("parserResponseData");
        //  console.info(serverResponse.data);
        //  console.groupEnd();
        //  if collection -> if response is an array

        try {
            const serverResponse = await this.promise;

            if (Array.isArray(serverResponse.data)) {
                return serverResponse
                    .data
                    .map(o =>
                        this.config.parseResponseData(o))

            } else {
                // response.data.map(:w
                // o => config.parseResponseData(o))
                // if detail -> if response is an object
                console.debug(serverResponse)
                return this.config.parseResponseData(serverResponse.data);
            }
        } catch (err) {
            console.error(err);
            console.info("refactor all api response related error handling here")
            throw new Error("ApiResponse.parseResponseContent", err.stack)
        }
    };
}

export default ApiResponse;
