import GwClientApi from '../../api/gwClientApi';
import * as types from './asset-group.action-types';
import * as apiHelpers from '../../common/api.helpers';
import * as appActions from '../../actions/app.actions';


export function loadAllAssetGroups() {
    return function (dispatch) {
        const promise = GwClientApi.getAssetGroups();
        promise.then(response => {
            dispatch(appActions.setInfoMessage("Loaded all asset groups successfully"));
            dispatch(loadAssetGroupsSuccess(response.data));
        }).catch(error => {
               if (apiHelpers.isNetworkError(error)){
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


export function loadAssetGroupsSuccess(groups) {
    return {type: types.LOAD_ASSET_GROUPS_SUCCESS, groups}
}

/*
export function postTag({name, description}) {

    return function (dispatch) {

        const resolveCallback = (tag) => {
            dispatch(appActions.setInfoMessage(`Created tag: ${tag.name}`));
            dispatch(postTagSuccess(tag));
        };
        const promise = GwClientApi.postTag({name, description});
        return {promise, resolveCallback};
    }
}

export function postTagSuccess(tag) {
    return {type: types.POST_TAG_SUCCESS, tag}
}


export function updateTag(tag) {
    return function (dispatch) {
        const resolveCallback = tag => {
            dispatch(appActions.setInfoMessage(`Updated tag: ${tag.name}`));
            dispatch(updateTagSuccess({tag}));
        };
        const promise = GwClientApi.putTag(tag);
        return {promise, resolveCallback};
    }
}

export function updateTagSuccess({tag}) {
    return {type: types.UPDATE_TAG_SUCCESS, tag};
}


export function deleteTag({name}) {
    return function (dispatch) {
        const resolveCallback = () => {
            dispatch(appActions.setInfoMessage(`Deleted tag: ${name}`));
            dispatch(deleteTagSuccess({tagName: name}));
        };
        const promise = GwClientApi.deleteTag({name});
        return {promise, resolveCallback};
    }
}

export function deleteTagSuccess({tagName}) {
    return {type: types.DELETE_TAG_SUCCESS, tagName};
}
*/

