import { ASSET, MAPPING, TAG } from "../../constants";
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
    SET_NODE_COLOR_SELECTION
} from './detail-form.action-types';


export function setDetailFormType(type: ASSET | MAPPING | TAG){
    return {type: SET_DETAIL_FORM_TYPE, formType: type }
}

export function setAssetFilterValue(value: string){
    return {type: SET_ASSET_FILTER_VALUE, value};
}

export function setTagFilterValue(value: string){
    return {type: SET_TAG_FILTER_VALUE, value};
}

export function setResourceNameValue(value: string){
    return {type: SET_RESOURCE_NAME_VALUE, value};
}

export function setResourceDescriptionValue(value: string){
    return {type: SET_RESOURCE_DESCRIPTION_VALUE, value};
}

export function addAssetToSelected(value: string){
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

export function setAssetGroupSelection(value: string){
    return {type: SET_ASSET_GROUP_SELECTION, value}
}

export function setNodeColorSelection(value: string){
    return {type: SET_NODE_COLOR_SELECTION, value}
}

export function setNodeShapeSelection(value: string){
    return {type: SET_NODE_SHAPE_SELECTION, value}
}
