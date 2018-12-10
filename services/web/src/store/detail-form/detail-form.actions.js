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
    SET_FORM_EDIT_FALSE, SET_VALUES_FROM_DETAIL,
    CLEAR_FORM
} from './detail-form.action-types';
import type {Dispatch} from "../types";
import type {Asset, Connection, Mapping, Tag} from "../types";


export function setDetailFormType(type: ASSET | MAPPING | TAG) {
    return {type: SET_DETAIL_FORM_TYPE, formType: type}
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

export function setValuesFromDetail(detail) {
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

// use to load active detail
// into the detailForm state
// when editing a detail
const detailToFormMapping = {
    ASSET: (asset: Asset) => ({
        name: asset.name,
        description: asset.description,
        selectedAssets: asset.connected_to.map(asset => asset.name),
        selectedTags: asset.tags.map(tag => tag.name),
        group: asset.group,
        nodeColor: asset.nodeColor,
        nodeShape: asset.nodeShape
    }),
    MAPPING: (mapping: Mapping) => ({
        name: mapping.name,
        description: mapping.description,
        selectedAssets: mapping.assets.map(asset => asset.name),
        selectedTags: mapping.tags.map(tag => tag.name),
    }),
    TAG: (tag: Tag) => ({
        name: tag.name,
        description: tag.description
    }),
    CONNECTION: (connection: Connection) => ({...connection})
}


