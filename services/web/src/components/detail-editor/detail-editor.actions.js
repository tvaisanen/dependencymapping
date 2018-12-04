import {ASSET, MAPPING, TAG} from "../../constants";
import type {Dispatch} from "../../store/types";
import { BROWSE } from "../../constants/views";
import * as detailFormActions from '../../store/detail-form/detail-form.actions';
import * as actions from '../resource-controller/resource-controller.actions';
import * as actionsAsset from '../../store/asset/asset.actions';
import * as actionsMapping from '../../store/mapping/mapping.actions';
import * as actionsTag from '../../store/tag/tag.actions';
import * as types from '../../constants/types';
import type { Asset, Mapping, Tag } from "../../store/types";

import * as activeDetailActions from '../../store/active-detail/active-detail.actions';
import * as appActions from '../../actions/app.actions';
import * as dependencyMapHelpers from "../../common/dependency-map.helpers";
import {setFormEditFalse} from "../../store/detail-form/detail-form.actions";

export function closeFormAndSetActiveDetail(activeDetail) {
    return function (dispatch, getState) {
        console.group("Debug !");
        console.info(activeDetail);
        console.groupEnd();

        dispatch(activeDetailActions.setActiveDetailWithResourceCollecting(activeDetail));
        dispatch(closeEdit());
        // if active detail is mapping

        const isMapping = activeDetail.type === types.MAPPING;

        if ( isMapping && activeDetail.setDetail) {
            // if the detail is a type of MAPPING
            // it needs to be loaded
            dependencyMapHelpers.loadDependencyMap(
                activeDetail.data.name || "None",
                getState().graph,
                getState().mappings,
                getState().assets,
                dispatch,
                getState().app.graph.selectedLayout
            )
        }

    }
}

export function closeEdit() {
    return function (dispatch, getState) {
        dispatch(appActions.setEditFalse());
        dispatch(detailFormActions.setFormEditFalse());
        dispatch(appActions.setBottomPanelView(BROWSE))
    }
}

const dispatchFormActions = (dispatch) => ({
    [types.ASSET]: {
        post: (asset: Asset) => dispatch(actionsAsset.postAsset(asset)),
        put: (asset: Asset) => dispatch(actionsAsset.updateAsset(asset)),
        delete: (name: string) => dispatch(actionsAsset.deleteAsset(name)),
    },
    [types.MAPPING]: {
        post: (mapping: Mapping) => dispatch(actionsMapping.postMapping(mapping)),
        put: (mapping: Mapping) => dispatch(actionsMapping.updateMapping(mapping)),
        delete: (name: string) => dispatch(actionsMapping.deleteMapping(name)),
    },

    [types.TAG]: {
        post: (tag: Tag) => dispatch(actionsTag.postTag(tag)),
        put: (tag: Tag) => dispatch(actionsTag.updateTag(tag)),
        delete: (name: string) => dispatch(actionsTag.deleteTag(name)),
    }
});


type FormProps = {
    name: string,
    description: string,
    selectedAssets: Array<string> | void,
    selectedTags: Array<string> | void,
    group: string | void,
    nodeShape: string | void,
    nodeColor: string | void,
}

/**
 *  map from detailForm to resource form
 */

const getForm = {
    ASSET: (detailForm: FormProps) => ({
        name: detailForm.name,
        description: detailForm.description,
        connected_to: detailForm.selectedAssets,
        tags: detailForm.selectedTags,
        group: detailForm.group,
        nodeShape: detailForm.nodeShape,
        nodeColor: detailForm.nodeColor
    }),
    MAPPING: (detailForm) => ({
        name: detailForm.name,
        description: detailForm.description,
        assets: detailForm.selectedAssets,
        tags: detailForm.selectedTags,
    }),
    TAG: (detailForm) => ({
        name: detailForm.name,
        description: detailForm.description,
    }),
};

export function onSave(): Dispatch {
    return async function (dispatch: Dispatch, getState: State): void {

        const {detailForm} = getState();
        const { formType } = detailForm;

        const formActions = dispatchFormActions(dispatch);
        const form = getForm[formType](detailForm);

        console.group("onSave form:");
        console.info(form);
        console.groupEnd();

        // if edit use put if new use post
        const method = detailForm.edit ? 'put' : 'post';

        try {
            const { promise, resolveCallback } = await formActions[formType][method](form);
            const response = await promise;

            console.info(response);

            resolveCallback(response.data);
            dispatch(closeFormAndSetActiveDetail({type: formType, data: response.data}));
            dispatch(detailFormActions.clearForm());
            dispatch(setFormEditFalse());

        } catch (err) {
            console.info(err);
            console.log(err.data);
        }

    }
}

export function onDelete(): Dispatch {


    return async function (dispatch: Dispatch, getState: State): void {

        const {detailForm} = getState();
        const { formType, name } = detailForm;

        const confirmDelete = window.confirm(`Are you sure that you want to delete: ${name}?`);

        const formActions = dispatchFormActions(dispatch);
        const form = getForm[formType](detailForm);

        // if edit use put if new use post

        try {
            const { promise, resolveCallback } = await formActions[formType].delete((name:string));
            const response = await promise;

            console.info(response);

            resolveCallback();

            dispatch(activeDetailActions.clearActiveDetail());
            dispatch(detailFormActions.clearForm());
            dispatch(closeEdit());
            dispatch(setFormEditFalse());

        } catch (err) {
            console.info(err);
            console.log(err.data);
        }
    }
}

export function clickDetailType(type: ASSET | TAG | MAPPING): Dispatch {
    return function (dispatch: Dispatch): void {
        dispatch(detailFormActions.setDetailFormType(type));
    }
}

/**
 *  Track changes in asset selection filter
 */
export function onAssetFilterChange(value: string): Dispatch {
    return function (dispatch: Dispatch): void {
        dispatch(detailFormActions.setAssetFilterValue(value))
    }
}

/**
 *  Track changes in tag selection filter
 */
export function onTagFilterChange(value: string): Dispatch {
    return function (dispatch: Dispatch): void {
        dispatch(detailFormActions.setTagFilterValue(value))
    }
}

/**
 *  Track changes in resource name input
 */
export function onResourceNameChange(value: string): Dispatch {
    //alert(`detail-editor.actions.onResourceNameChange(${value})`);
    return function (dispatch: Dispatch): void {
        dispatch(detailFormActions.setResourceNameValue(value))
    }
}

/**
 *  Track changes in resource description text area
 */
export function onResourceDescriptionChange(value: string): Dispatch {
    //alert(`detail-editor.actions.onResourceNameChange(${value})`);
    return function (dispatch: Dispatch): void {
        dispatch(detailFormActions.setResourceDescriptionValue(value))
    }
}

/**
 *  Track changes in resource description text area
 */
export function addAssetToSelected(value: string): Dispatch {
    //alert(`detail-editor.actions.onResourceNameChange(${value})`);
    return function (dispatch: Dispatch): void {
        dispatch(detailFormActions.addAssetToSelected(value))
    }
}

/**
 *  Track changes in resource description text area
 */
export function addTagToSelected(value: string): Dispatch {
    //alert(`detail-editor.actions.onResourceNameChange(${value})`);
    return function (dispatch: Dispatch): void {
        dispatch(detailFormActions.addTagToSelected(value))
    }
}

/**
 *  Track changes in resource description text area
 */
export function removeAssetFromSelected(value: string): Dispatch {
    //alert(`detail-editor.actions.onResourceNameChange(${value})`);
    return function (dispatch: Dispatch): void {
        dispatch(detailFormActions.removeAssetFromSelected(value))
    }
}

/**
 *  Track changes in resource description text area
 */
export function removeTagFromSelected(value: string): Dispatch {
    //alert(`detail-editor.actions.onResourceNameChange(${value})`);
    return function (dispatch: Dispatch): void {
        dispatch(detailFormActions.removeTagFromSelected(value))
    }
}

export function onAssetGroupSelection(value: string): Dispatch {
    return function (dispatch: Dispatch): void {
        dispatch(detailFormActions.setAssetGroupSelection((value: string)))
    }
}

export function onNodeColorSelection(value: string): Dispatch {
    return function (dispatch: Dispatch): void {
        dispatch(detailFormActions.setNodeColorSelection((value: string)))
    }
}

export function onNodeShapeSelection(value: string): Dispatch {
    return function (dispatch: Dispatch): void {
        dispatch(detailFormActions.setNodeShapeSelection((value: string)))
    }
}
