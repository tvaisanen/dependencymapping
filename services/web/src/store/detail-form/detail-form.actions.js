//@flow
import {ASSET, MAPPING, TAG} from "../../constants";
import {
    SET_DETAIL_FORM_TYPE,
    SET_ASSET_FILTER_VALUE,
    SET_TAG_FILTER_VALUE,
    SET_RESOURCE_NAME_VALUE,
    SET_RESOURCE_DESCRIPTION_VALUE,
    ADD_TAG_TO_SELECTED,
    ADD_ASSET_TO_SELECTED,
    REMOVE_ASSET_FROM_SELECTED,
    REMOVE_TAG_FROM_SELECTED,
    SET_ASSET_GROUP_SELECTION,
    SET_NODE_SHAPE_SELECTION,
    SET_NODE_COLOR_SELECTION,
    SET_FORM_EDIT_TRUE,
    SET_FORM_EDIT_FALSE,
    SET_VALUES_FROM_DETAIL,
    CLEAR_FORM,
    SET_SOURCE_VALUE,
    SET_TARGET_VALUE,
    SET_ERROR_VALUE,
    SET_ERRORS,
    CLEAR_ERRORS,
    SET_TARGET_ARROW_FALSE,
    SET_TARGET_ARROW_TRUE,
    SET_SOURCE_ARROW_FALSE,
    SET_SOURCE_ARROW_TRUE,
    SET_EDGE_LABEL_VALUE
} from './detail-form.action-types';
import type { Dispatch, State} from "../types";
import type {Asset, Connection, Mapping, Tag} from "../types";
import {detailToFormMapping} from "./detail-form.utils";

type Detail = Asset | Connection | Mapping | Tag;

export function setDetailFormType(type: ASSET | MAPPING | TAG) {
    return {type: SET_DETAIL_FORM_TYPE, formType: type}
}

export function setSourceValue(value: string) {
    return {type: SET_SOURCE_VALUE, value};
}

export function setTargetValue(value: string) {
    return {type: SET_TARGET_VALUE, value};
}

export function setAssetFilterValue(value: string) {
    return {type: SET_ASSET_FILTER_VALUE, value};
}

export function setTagFilterValue(value: string) {
    return {type: SET_TAG_FILTER_VALUE, value};
}

export function setResourceNameValue(value: string) {
    return {type: SET_RESOURCE_NAME_VALUE, value};
}

export function setResourceDescriptionValue(value: string) {
    return {type: SET_RESOURCE_DESCRIPTION_VALUE, value};
}

export function addAssetToSelected(value: string) {
    // add asset name to selected assets
    return {type: ADD_ASSET_TO_SELECTED, value};
}

export function addTagToSelected(value: string) {
    return {type: ADD_TAG_TO_SELECTED, value};
}

export function removeAssetFromSelected(value: string) {
    return {type: REMOVE_ASSET_FROM_SELECTED, value};
}

export function removeTagFromSelected(value: string) {
    return {type: REMOVE_TAG_FROM_SELECTED, value};
}

export function setAssetGroupSelection(value: string) {
    return {type: SET_ASSET_GROUP_SELECTION, value}
}

export function setNodeColorSelection(value: string) {
    return {type: SET_NODE_COLOR_SELECTION, value}
}

export function setNodeShapeSelection(value: string) {
    return {type: SET_NODE_SHAPE_SELECTION, value}
}

export function setValuesFromDetail(detail: Detail) {
    return {type: SET_VALUES_FROM_DETAIL, detail};
}

export function setFormEditTrue() {
    return function (dispatch: Dispatch, getState: State): void {

        // if set to edit load activeDetail

        const {activeDetail} = getState();
        const {type, data} = activeDetail;

        const detail = detailToFormMapping[type](data);

        dispatch(setDetailFormType(type));
        dispatch(setValuesFromDetail(detail));
        dispatch({type: SET_FORM_EDIT_TRUE});
    }
}

export function setFormEditFalse() {
    return {type: SET_FORM_EDIT_FALSE};
}

export function clearForm(){
    return {type: CLEAR_FORM}
}


export function setErrors(value: any) {
    return {type: SET_ERRORS, value}
}

export function clearErrors(){
    return {type: CLEAR_ERRORS};
}

export function setErrorMsg(value: string) {
    return {type: SET_ERROR_VALUE, value}
}

export function setSourceArrowTrue() {
    return {type: SET_SOURCE_ARROW_TRUE}
}

export function setSourceArrowFalse() {
    return {type: SET_SOURCE_ARROW_FALSE}
}

export function setTargetArrowTrue() {
    return {type: SET_TARGET_ARROW_TRUE}
}

export function setTargetArrowFalse() {
    return {type: SET_TARGET_ARROW_FALSE}
}

export function setEdgeLabelValue(value: string){
    return {type: SET_EDGE_LABEL_VALUE, value}
}


