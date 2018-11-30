import { ASSET, MAPPING, TAG } from "../../constants";
import type {Dispatch} from "../../store/types";

import * as detailFormActions from '../../store/detail-form/detail-form.actions';

export function clickDetailType (type: ASSET | TAG | MAPPING): Dispatch {
    return function (dispatch: Dispatch): void {
        dispatch(detailFormActions.setDetailFormType(type));
    }
}
/**
 *  Track changes in asset selection filter
 */
export function onAssetFilterChange (value: string): Dispatch {
    return function (dispatch: Dispatch): void {
        dispatch(detailFormActions.setAssetFilterValue(value))
    }
}
/**
 *  Track changes in tag selection filter
 */
export function onTagFilterChange (value: string): Dispatch {
    return function (dispatch: Dispatch): void {
        dispatch(detailFormActions.setTagFilterValue(value))
    }
}
/**
 *  Track changes in resource name input
 */
export function onResourceNameChange (value: string): Dispatch {
    //alert(`detail-editor.actions.onResourceNameChange(${value})`);
    return function (dispatch: Dispatch): void {
        dispatch(detailFormActions.setResourceNameValue(value))
    }
}
/**
 *  Track changes in resource description text area
 */
export function onResourceDescriptionChange (value: string): Dispatch {
    //alert(`detail-editor.actions.onResourceNameChange(${value})`);
    return function (dispatch: Dispatch): void {
        dispatch(detailFormActions.setResourceDescriptionValue(value))
    }
}
/**
 *  Track changes in resource description text area
 */
export function addAssetToSelected (value: string): Dispatch {
    //alert(`detail-editor.actions.onResourceNameChange(${value})`);
    return function (dispatch: Dispatch): void {
        dispatch(detailFormActions.addAssetToSelected(value))
    }
}
/**
 *  Track changes in resource description text area
 */
export function addTagToSelected (value: string): Dispatch {
    //alert(`detail-editor.actions.onResourceNameChange(${value})`);
    return function (dispatch: Dispatch): void {
        dispatch(detailFormActions.addTagToSelected(value))
    }
}
/**
 *  Track changes in resource description text area
 */
export function removeAssetFromSelected (value: string): Dispatch {
    //alert(`detail-editor.actions.onResourceNameChange(${value})`);
    return function (dispatch: Dispatch): void {
        dispatch(detailFormActions.removeAssetFromSelected(value))
    }
}
/**
 *  Track changes in resource description text area
 */
export function removeTagFromSelected (value: string): Dispatch {
    //alert(`detail-editor.actions.onResourceNameChange(${value})`);
    return function (dispatch: Dispatch): void {
        dispatch(detailFormActions.removeTagFromSelected(value))
    }
}

export function onAssetGroupSelection (value: string): Dispatch {
    return function (dispatch: Dispatch): void {
        dispatch(detailFormActions.setAssetGroupSelection((value: string)))
    }
}

export function onNodeColorSelection (value: string): Dispatch {
    return function (dispatch: Dispatch): void {
        dispatch(detailFormActions.setNodeColorSelection((value: string)))
    }
}

export function onNodeShapeSelection (value: string): Dispatch {
    return function (dispatch: Dispatch): void {
        dispatch(detailFormActions.setNodeShapeSelection((value: string)))
    }
}
