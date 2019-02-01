import {ASSET, MAPPING, TAG, CONNECTION} from "../../constants";
import type {Dispatch} from "../../store/types";
import {BROWSE} from "../../constants/views";

import * as detailFormActions from '../../store/detail-form/detail-form.actions';


import * as types from '../../constants/types';

import * as activeDetailActions from '../../store/active-detail/active-detail.actions';
import * as appActions from '../../actions/app.actions';
import * as dependencyMapHelpers from "../../store/active-mapping/active-mapping.utils";

import formValidators from '../../store/detail-form/form.validators';

import {collectFormData, typeToActionMap} from "./detail-editor.utils";
import type {FormAndOptionalCallback} from "../../store/store-action.arg-types";


export function closeFormAndSetActiveDetail(activeDetail) {
    /**
     * Use this for closing the form and setting
     * the active detail
     */
    return function (dispatch, getState) {

        dispatch(activeDetailActions.setAsActiveDetail(activeDetail));
        dispatch(closeEdit());

        // if active detail is mapping
        const isMapping = activeDetail.type === types.MAPPING;

        if (isMapping) {

            // if the detail is a type of MAPPING
            // it needs to be loaded
            dispatch(
                dependencyMapHelpers
                    .loadDependencyMap(
                        activeDetail.data.name || "None",
                        dispatch,
                        getState
                    )
            )
        }
    }
}

export function closeEdit() {
    return function (dispatch: Dispatch): void {
        dispatch(appActions.setEditFalse());
        dispatch(detailFormActions.setFormEditFalse());
        dispatch(appActions.setBottomPanelView(BROWSE))
    }
}


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
    return async function (
        dispatch: Dispatch, getState: State): void {

        // clear detail form errors
        dispatch(detailFormActions.clearErrors());

        const {detailForm} = getState();
        const {form, formType, method} = collectFormData(detailForm);

        const {
            formIsValid,
            fieldErrors
        } = formValidators[formType](form);


        if (!formIsValid) {
            console.info(fieldErrors)
            dispatch(appActions.setInfoMessage("INVALID FORM"));
            dispatch(detailFormActions.setErrors(fieldErrors));
            return
        }


        const formAction = typeToActionMap[formType][method];

        try {
            /**
             *  this function is called  by form action
             *  after resolving api actions
             */
            const callback = (responseData) => {
                dispatch(
                    closeFormAndSetActiveDetail({
                        type: formType,
                        data: responseData
                    }));
                dispatch(detailFormActions.clearForm());
                dispatch(detailFormActions.setFormEditFalse());

            };

            dispatch(formAction({form, callback}))

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
                console.error(err)
                throw new Error(`Unhandled exception :: detail-editor.actions.onSave() :: ${err}`)
            }


        }
    }
}

export function onDelete(): Dispatch {

    return async function (dispatch: Dispatch, getState: State)
        : void {
        const {detailForm} = getState();
        const {formType, name, source, target} = detailForm;

        const confirmDelete = window
            .confirm(
                //! todo: refactor texts to constants
                `Are you sure that you want to delete: ${name}?`
            );

        //const formActions = dispatchFormActions(dispatch);

        if (confirmDelete) {

            /**
             *   form action uses
             *   this as a callback
             *   after the action have
             *   been executed
             */
            const callback = () => {
                dispatch(activeDetailActions.clearActiveDetail());
                dispatch(detailFormActions.clearForm());
                dispatch(closeEdit());
                dispatch(detailFormActions.setFormEditFalse());
            };

            const args = formType === CONNECTION ?
                {form: {source: source.name, target: target.name}}
                : {form: {name}}
            ;


            try {
                await
                    dispatch(typeToActionMap[formType]
                        .delete(({
                            ...args,
                            callback
                        }: FormAndOptionalCallback))
                    );
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

export function onAssetFilterChange(value: string): Dispatch {
    return function (dispatch: Dispatch): void {
        dispatch(detailFormActions.setAssetFilterValue(value))
    }
}

export function onTagFilterChange(value: string): Dispatch {
    return function (dispatch: Dispatch): void {
        dispatch(detailFormActions.setTagFilterValue(value))
    }
}

export function onResourceNameChange(value: string): Dispatch {
    //alert(`detail-editor.actions.onResourceNameChange(${value})`);
    return function (dispatch: Dispatch): void {
        dispatch(detailFormActions.setResourceNameValue(value))
    }
}

export function onResourceDescriptionChange(value: string): Dispatch {
    //alert(`detail-editor.actions.onResourceNameChange(${value})`);
    return function (dispatch: Dispatch): void {
        dispatch(detailFormActions.setResourceDescriptionValue(value))
    }
}

export function addAssetToSelected(value: string): Dispatch {
    //alert(`detail-editor.actions.onResourceNameChange(${value})`);
    return function (dispatch: Dispatch): void {
        dispatch(detailFormActions.addAssetToSelected(value))
    }
}

export function addTagToSelected(value: string): Dispatch {
    //alert(`detail-editor.actions.onResourceNameChange(${value})`);
    return function (dispatch: Dispatch): void {
        dispatch(detailFormActions.addTagToSelected(value))
    }
}

export function removeAssetFromSelected(value: string): Dispatch {
    //alert(`detail-editor.actions.onResourceNameChange(${value})`);
    return function (dispatch: Dispatch): void {
        dispatch(detailFormActions.removeAssetFromSelected(value))
    }
}

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

export function toggleSourceArrow() {
    return function (dispatch: Dispatch, getState): void {
        const {sourceArrow} = getState().detailForm;

        if (sourceArrow) {
            dispatch(detailFormActions.setSourceArrowFalse())
        } else {
            dispatch(detailFormActions.setSourceArrowTrue())
        }
    }
}

export function toggleTargetArrow() {
    return function (dispatch: Dispatch, getState): void {

        const {targetArrow} = getState().detailForm;

        if (targetArrow) {
            dispatch(detailFormActions.setTargetArrowFalse())
        } else {
            dispatch(detailFormActions.setTargetArrowTrue())
        }
    }
}

export function onEdgeLabelChange(value: string) {
    return function (dispatch: Dispatch): void {
        dispatch(detailFormActions.setEdgeLabelValue((value: string)));
    }
}
