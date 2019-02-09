// @flow

import GwClientApi from '../../api/gwClientApi';
import * as types from './tag.action-types';
import * as apiHelpers from '../../api/api.utils';
import { setInfoMessage } from "../ui/ui.actions";


import { routeApiActionError } from "../error-handling";

import type { Dispatch, Tag } from "../types";
import type {FormAndOptionalCallback} from "../store-action.arg-types";

const api = GwClientApi;

/********* TAG POST *******************/

export function postTag(props: FormAndOptionalCallback): Dispatch {
    /**
     *  Dispatchable store action to create new Tag.
     *  Related state actions handled here.
     *
     *  @return server response data
     * */

    return async function (dispatch: Dispatch): Promise<any> {

        try {
            const {form, callback} = props;

            const storedTag = await
                api
                    .tag
                    .post(form)
                    .parseResponseContent();

            dispatch(setInfoMessage(`Created tag: ${storedTag.name}`));
            dispatch(postTagSuccess(storedTag));

            // run callers callback function
            if (callback) { callback(storedTag) }

        } catch (err) {
            routeApiActionError(err);
        }
    }
}

export function postTagSuccess(tag: Tag) {
    return {type: types.POST_TAG_SUCCESS, tag}
}

/*************** TAG UPDATE **************/

export function updateTag(props: FormAndOptionalCallback) {

    return async function (dispatch: Dispatch) {

        try {
            const {form, callback} = props;

            // const response = await GwClientApi.putTag(tag);

            const updatedTag = await
                api
                    .tag
                    .put(form)
                    .parseResponseContent();

            /**   update does not return the data
             *    -> update state with the payload
             *    after confirming success
             */

            dispatch(setInfoMessage(`Updated tag: ${form.name}`));
            dispatch(updateTagSuccess(updatedTag));

            if (callback) { callback(updatedTag) }

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

export function deleteTag(props: FormAndOptionalCallback) {
    /**
     *  Async redux action
     */
    return async function (dispatch: Dispatch) {
        try {
            //const response = await GwClientApi.deleteTag(name);
            const {form, callback} = props;
            await api.tag.delete(form);

            dispatch(setInfoMessage(`Deleted tag: ${form.name}`));
            dispatch(deleteTagSuccess(props.name));

            if (callback) {
                callback();
            }

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
            dispatch(setInfoMessage("Loaded all tags successfully"));
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

