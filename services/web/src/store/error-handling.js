export function routeApiActionError(err) {

    if (err.response) {

        /** if error has a response
         *  it is from the API
         *  callers responsibility
         *  throw error with the original
         */

        let error = new Error(`tag.actions.postTag() :: ${err} `,);
        error.response = err.response;

        throw error;

    } else {

        // do something else
        throw new Error(err)
    }
}