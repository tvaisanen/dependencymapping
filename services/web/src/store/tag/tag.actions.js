// @flow

import GwClientApi from '../../api/gwClientApi';
import * as types from './tag.action-types';
import * as apiHelpers from '../../common/api.helpers';
import * as appActions from '../../actions/app.actions';
import * as detailFormActions from '../detail-form/detail-form.actions';

import type { Dispatch, Tag } from "../types";

/********* TAG POST *******************/

export function postTag({name, description}): Dispatch {
    /**
     *  Dispatchable store action to create new Tag.
     *  Related state actions handled here.
     *
     *  @return server response data
     * */

    return async function (dispatch: Dispatch): Tag {

        try {

            // wait for the response
            const response = await
                GwClientApi.postTag({
                    name,
                    description
                });

            alert('here')

            // response data should be of a type Tag
            const tag: Tag = response.data;

            // set info message
            dispatch(appActions
                .setInfoMessage(
                    `Created tag: ${tag.name}`
                )
            );

            // update tag reducer state
            dispatch(postTagSuccess(tag));
            return tag;

        } catch (err) {

            const status = err.response.status;
            console.info(err.response);

            if (status === 409) {
                // conflict -> error with name field

                // name field error
                const errors = {
                    name: err.response.data.error
                };

                // set errors to be displayed in the form
                dispatch(detailFormActions.setErrors(errors));

            }

            throw new Error(`tag.actions.postTag() :: ${err} `)
        }
    }
}

export function postTagSuccess(tag) {
    return {type: types.POST_TAG_SUCCESS, tag}
}

/*************** TAG UPDATE **************/

export function updateTag(tag) {
    return async function (dispatch) {

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

            throw new Error(`tag.actions.postTag() :: ${err} `)
        }

    }
}

export function updateTagSuccess(tag) {
    return {type: types.UPDATE_TAG_SUCCESS, tag};
}

/*************** DELETE **************/

export function deleteTag(name) {
    /**
     *  Async redux action
     */
    return async function (dispatch) {
        try {
            const response = await GwClientApi.deleteTag(name);
            dispatch(appActions.setInfoMessage(`Deleted tag: ${name}`));
            dispatch(deleteTagSuccess({tagName: name}));

            // delete action does not need a response
        } catch (err) {
            // if error occurs
            throw new Error('Error needs to be handled')
        }

    }
}

export function deleteTagSuccess({tagName}) {
    return {type: types.DELETE_TAG_SUCCESS, tagName};
}

/******************************************/

export function loadAllTags() {
    return function (dispatch) {
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


export function loadTagsSuccess(tags) {
    return {type: types.LOAD_TAGS_SUCCESS, tags}
}

