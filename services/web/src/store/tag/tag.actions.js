// @flow

import GwClientApi from '../../api/gwClientApi';
import * as types from './tag.action-types';
import * as apiHelpers from '../../common/api.helpers';
import * as appActions from '../../actions/app.actions';
import * as detailFormActions from '../detail-form/detail-form.actions';
import { TAG } from "../../constants";

import { parseHALResponseData } from "../response-parser";

import { routeApiActionError } from "../error-handling";

import type { Dispatch, Tag } from "../types";

/********* TAG POST *******************/

export function postTag(tag: Tag, callback: (any) => void): Dispatch {
    /**
     *  Dispatchable store action to create new Tag.
     *  Related state actions handled here.
     *
     *  @return server response data
     * */

    return async function (dispatch: Dispatch): Promise<any> {

        try {

            // wait for the response
            const response = await GwClientApi.postTag(tag);

            // response data should be of a type Tag
            const storedTag: Tag = parseHALResponseData(TAG, response.data);

            dispatch(appActions.setInfoMessage(`Created tag: ${storedTag.name}`));
            dispatch(postTagSuccess(storedTag));

            // run callers callback function
            callback ? callback(storedTag) : null;

        } catch (err) {
            routeApiActionError(err);
        }
    }
}

export function postTagSuccess(tag: Tag) {
    return {type: types.POST_TAG_SUCCESS, tag}
}

/*************** TAG UPDATE **************/

export function updateTag(tag: Tag) {

    return async function (dispatch: Dispatch) {

        try {
            const response = await GwClientApi.putTag(tag);

            /**   update does not return the data
             *    -> update state with the payload
             *    after confirming success
             */

            dispatch(appActions.setInfoMessage(`Updated tag: ${tag.name}`));
            dispatch(updateTagSuccess(tag));

            // return the data to unify the API
            return tag;

        } catch (err) {
            // handle updateTag related errors here
            routeApiActionError(err);
        }

    }
}

export function updateTagSuccess(tag: Tag) {
    return {type: types.UPDATE_TAG_SUCCESS, tag};
}

/*************** DELETE **************/

export function deleteTag(name: string) {
    /**
     *  Async redux action
     */
    return async function (dispatch: Dispatch) {
        try {
            const response = await GwClientApi.deleteTag(name);
            dispatch(appActions.setInfoMessage(`Deleted tag: ${name}`));
            dispatch(deleteTagSuccess(name));

            // delete action does not need a response
            // this is not yet supported (err: {response: ?any}) ?
        } catch (err) {
            // if error occurs
            // handle updateTag related errors here
            if (err.response) {
                // throw this if error has response
                // -> server side error
                let error = new Error(`tag.actions.deleteTag() :: ${err} `,)
                error.response = err.response;
                throw error;
            } else {
                // todo: refactor to throwIfWithResponse
                routeApiActionError(err);
            }
        }

    }
}

export function deleteTagSuccess(tagName: string) {
    return {type: types.DELETE_TAG_SUCCESS, tagName};
}

/******************************************/

export function loadAllTags() {
    return function (dispatch: Dispatch) {
        const promise = GwClientApi.getTags();
        promise.then(response => {
            dispatch(appActions.setInfoMessage("Loaded all tags successfully"));
            dispatch(loadTagsSuccess(response.data));
        }).catch(error => {
            if (apiHelpers.isNetworkError(error)) {
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


export function loadTagsSuccess(tags: Array<Tag>) {
    return {type: types.LOAD_TAGS_SUCCESS, tags}
}

