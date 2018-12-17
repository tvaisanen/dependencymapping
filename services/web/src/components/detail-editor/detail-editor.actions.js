import {ASSET, MAPPING, TAG, CONNECTION} from "../../constants";
import type {Dispatch} from "../../store/types";
import {BROWSE} from "../../constants/views";

import * as detailFormActions from '../../store/detail-form/detail-form.actions';
import * as actionsAsset from '../../store/asset/asset.actions';
import * as actionsConnection from '../../store/connection/connection.actions';
import * as actionsMapping from '../../store/mapping/mapping.actions';
import * as actionsTag from '../../store/tag/tag.actions';

import * as types from '../../constants/types';
import type {Asset, Connection, Mapping, Tag} from "../../store/types";

import * as activeDetailActions from '../../store/active-detail/active-detail.actions';
import * as appActions from '../../actions/app.actions';
import * as dependencyMapHelpers from "../../common/dependency-map.helpers";


export function closeFormAndSetActiveDetail(activeDetail) {
    return function (dispatch, getState) {
        console.group("Debug !");
        console.info(activeDetail);
        console.groupEnd();

        dispatch(activeDetailActions.setActiveDetailWithResourceCollecting(activeDetail));
        dispatch(closeEdit());
        // if active detail is mapping

        const isMapping = activeDetail.type === types.MAPPING;

        if (isMapping) {

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
    return function (dispatch: Dispatch, getState: State): void {
        dispatch(appActions.setEditFalse());
        dispatch(detailFormActions.setFormEditFalse());
        dispatch(appActions.setBottomPanelView(BROWSE))
    }
}

const dispatchFormActions = (dispatch) => ({
    [types.ASSET]: {
        post: (asset: Asset, callback) => {
            dispatch(actionsAsset.postAsset(asset, callback));
        },
        put: (asset: Asset, callback) => {
            dispatch(actionsAsset.updateAsset(asset, callback));
        },
        delete: (name: string, callback) => {
            dispatch(actionsAsset.deleteAsset(name, callback));
        }
    },
    [types.CONNECTION]: {
        post: (connection: Connection, callback) => {
            dispatch(actionsConnection.postConnection(connection, callback))
        },
        put: (connection: Connection, callback) => {
            dispatch(actionsConnection.updateConnection(connection, callback))
        },
        delete: (name: string, callback) => {
            dispatch(actionsConnection.deleteConnection(name, callback))
        },
    },
    [types.MAPPING]: {
        post: (mapping: Mapping, callback) => dispatch(actionsMapping.postMapping(mapping, callback)),
        put: (mapping: Mapping, callback) => dispatch(actionsMapping.updateMapping(mapping, callback)),
        delete: (name: string, callback) => dispatch(actionsMapping.deleteMapping(name, callback)),
    },

    [types.TAG]: {
        post: (tag: Tag, callback) => dispatch(actionsTag.postTag(tag, callback)),
        put: (tag: Tag, callback) => dispatch(actionsTag.updateTag(tag, callback)),
        delete: (name: string, callback) => dispatch(actionsTag.deleteTag(name, callback)),
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
    source: string,
    target: string
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
    CONNECTION: (detailForm: FormProps) => ({
        source: detailForm.source,
        target: detailForm.target,
        description: detailForm.description,
        tags: detailForm.selectedTags
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
    /**
     *  onSave click handler action for
     *  DetailEditor.
     *
     *  Gets form data from detailForm
     *  store, which is used to do
     *  post or put request depending
     *  on the store state ( detailForm.edit )
     *
     *  uses dispatchFormActions(dispatch)
     *  to get the resource method and wrap
     *  dispatch
     */
    return async function (dispatch: Dispatch, getState: State): void {

        // clear detail form errors
        dispatch(detailFormActions.clearErrors());

        const {detailForm} = getState();
        const {formType} = detailForm;

        // get the right action and wrap with dispatch
        const formActions = dispatchFormActions(dispatch);
        const form = getForm[formType](detailForm);

        console.group("onSave form:");
        console.info(form);
        console.groupEnd();

        // if edit use put if new use post
        const method = detailForm.edit ? 'put' : 'post';

        try {

            /** todo: Refactor
             *
             *      resolveCallback to resource
             *      actions. This is still here because
             *      it was used for error handling before
             *      refactoring the form to detailForm reducer
             *
             *      Actions     state
             *      ----------------------
             *      tag:        refactored
             *      asset:      refactored
             *      mapping:    refactored
             *      connection: todo
             *
             */

            /**
             * this function is called  by form action
             * after resolving api actions
             */
            function callback(responseData) {
                dispatch(closeFormAndSetActiveDetail({
                    type: formType,
                    data: responseData
                }));
                dispatch(detailFormActions.clearForm());
                dispatch(detailFormActions.setFormEditFalse());
            }


            await
                formActions[formType][method](
                    form,
                    callback
                );


        } catch (err) {

            /**
             *  If err has a response. The action used
             *  returns a error response of an API call
             */


            if (err.response) {
                // handle errors

                const status = err.response.status;

                if (status === 409) {
                    // conflict -> resource already exists
                    // error name is already in use

                    // name field error
                    const errors = {
                        name: err.response.data.error
                    };

                    // set errors to be displayed in the form
                    dispatch(detailFormActions.setErrors(errors));

                }
            } else {
                throw new Error(`Unhandled exception :: detail-editor.actions.onSave() :: ${err}`)
            }


        }
    }
}

export function onDelete(): Dispatch {

    return async function (dispatch: Dispatch, getState: State)
        : void
    {
        const {detailForm} = getState();
        const {formType, name, source, target} = detailForm;

        const confirmDelete = window
            .confirm(`Are you sure that you want to delete: ${name}?`);

        const formActions = dispatchFormActions(dispatch);

        if (confirmDelete) {

            /**
             *   form action uses
             *   this as a callback
             *   after the action have
             *   been executed
             */
            function callback() {
                dispatch(activeDetailActions.clearActiveDetail());
                dispatch(detailFormActions.clearForm());
                dispatch(closeEdit());
                dispatch(detailFormActions.setFormEditFalse());
            }

            const args = formType === CONNECTION ?
                {source, target}
                : name
            ;

            alert(`args: ${JSON.stringify(args)}`);

            try {
                await
                    formActions[formType].delete(args, callback);
            } catch (err) {
                throw err;
            }
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

export function onSourceSelection(value: string) {
    return function (dispatch: Dispatch): void {
        dispatch(detailFormActions.setSourceValue((value: string)));
    }
}

export function onTargetSelection(value: string) {
    return function (dispatch: Dispatch): void {
        dispatch(detailFormActions.setTargetValue((value: string)));
    }
}
