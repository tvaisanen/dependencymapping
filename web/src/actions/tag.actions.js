import GwClientApi from '../api/gwClientApi';
import * as types from './actionTypes';


/********* TAG POST *******************/

export function postTag({name, description}) {

    return function (dispatch) {
        // if mapping already exist actionUpdate mapping
        dispatch(addTag({name, description}));

        return GwClientApi.postTag({name, description}).then(response => {
            dispatch(postTagSuccess(response));
            return response;
        }).catch(error => {
            console.info("postTag error");
            return error.response;
        });
    }
}


export function addTag(tag) {
    return {type: types.ADD_TAG, tag}
}


export function postTagSuccess(response) {
    return {type: types.ADD_TAG_SUCCESS, response}
}
/** *******************************************/
/*************** TAG UPDATE **************/

export function updateTag(tag) {
    console.info("updatetag")
    return function (dispatch) {
        return GwClientApi.putTag(tag)
            .then(response => {
                dispatch(updateTagSuccess({tag: response.data}));
                return response;
            }).catch(error => {
                return error.response;
            })
    }
}

export function updateTagSuccess({tag}) {
    console.info("updateTagSuccess");
    return {type: types.UPDATE_TAG_SUCCESS, tag};
}

/*************** DELETE **************/

export function deleteTag({name}) {
    console.info("deleteTag(" + name + ")");
    return function (dispatch) {
        return GwClientApi.deleteTag({name})
            .then(response => {
                dispatch(deleteTagSuccess({tagName: name}));
                return response;
            }).catch(error => {
                return error.response;
            })
    }
}

export function deleteTagSuccess({tagName}) {
    console.info('Delete tagg success.');
    return {type: types.DELETE_TAG_SUCCESS, tagName};
}

export function loadAllTags() {
    return function (dispatch) {
        return GwClientApi.getCategories().then(tags => {
            dispatch(loadTagsSuccess(tags));
        }).catch(error => {
            throw(error);
        });
    }
}


export function loadTagsSuccess(tags) {
    return {type: types.LOAD_CATEGORIES_SUCCESS, tags}
}

