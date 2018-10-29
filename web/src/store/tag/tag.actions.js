import GwClientApi from '../../api/gwClientApi';
import * as types from './tag.action-types';
import * as apiHelpers from '../../common/api.helpers';

/********* TAG POST *******************/

export function postTag({name, description}) {

    return function (dispatch) {

        const resolveCallback = (tag) => dispatch(postTagSuccess(tag));
        const promise = GwClientApi.postTag({name, description});
        return {promise, resolveCallback};
    }
}

export function postTagSuccess(tag) {
    return {type: types.POST_TAG_SUCCESS, tag}
}

/*************** TAG UPDATE **************/

export function updateTag(tag) {
    return function (dispatch) {
        const resolveCallback = tag => dispatch(updateTagSuccess({tag}));
        const promise = GwClientApi.putTag(tag);
        return {promise, resolveCallback};
    }
}

export function updateTagSuccess({tag}) {
    return {type: types.UPDATE_TAG_SUCCESS, tag};
}

/*************** DELETE **************/

export function deleteTag({name}) {
    return function (dispatch) {
        const resolveCallback = () => dispatch(deleteTagSuccess({tagName: name}));
        const promise = GwClientApi.deleteTag({name});
        return {promise, resolveCallback};
    }
}

export function deleteTagSuccess({tagName}) {
    return {type: types.DELETE_TAG_SUCCESS, tagName};
}

export function loadAllTags() {
    return function (dispatch) {
        const promise = GwClientApi.getTags();
        promise.then(response => {
            dispatch(loadTagsSuccess(response.data));
        }).catch(error => {
               if (error.message && error.message === "Network Error"){
                dispatch(apiHelpers.handleNetworkError(error));
            } else {
            console.group("loadAllResources() -> <Error>");
            console.warn(error);
            console.groupEnd();

                   throw(error);
            }

        });
    }
}


export function loadTagsSuccess(tags) {
    return {type: types.LOAD_TAGS_SUCCESS, tags}
}

