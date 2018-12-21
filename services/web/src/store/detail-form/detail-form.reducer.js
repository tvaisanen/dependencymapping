//  @flow

import {
    SET_DETAIL_FORM_TYPE,
    SET_RESOURCE_NAME_VALUE,
    SET_ASSET_FILTER_VALUE,
    SET_TAG_FILTER_VALUE,
    SET_RESOURCE_DESCRIPTION_VALUE,
    ADD_ASSET_TO_SELECTED,
    ADD_TAG_TO_SELECTED,
    REMOVE_ASSET_FROM_SELECTED,
    REMOVE_TAG_FROM_SELECTED,
    SET_NODE_COLOR_SELECTION,
    SET_ASSET_GROUP_SELECTION,
    SET_NODE_SHAPE_SELECTION,
    SET_FORM_EDIT_FALSE,
    SET_FORM_EDIT_TRUE,
    SET_VALUES_FROM_DETAIL,
    CLEAR_FORM,
    SET_SOURCE_VALUE,
    SET_TARGET_VALUE,
    SET_ERROR_VALUE,
    SET_ERRORS,
    CLEAR_ERRORS
} from "./detail-form.action-types";

const initialState = {
    showFormSelection: true,
    assetFilter: "",
    selectedAssets: [],
    tagFilter: "",
    selectedTags: [],
    name: "",
    edit: false,
    description: "",
    errors: {},
    errorMsg: "",
    formType: "CONNECTION",
    selections: true, // if there's the selects
    nodeShape: "ellipse",
    nodeColor: "black",
    group: "none",
    source: "",
    target: "",
};

export default function (state = initialState, action) {

    const {formType, detail, value} = action;

    switch (action.type) {

        case CLEAR_FORM:
            return initialState;

        case SET_VALUES_FROM_DETAIL:
            console.group("set detail to form");
            console.info(action.detail);
            console.groupEnd();
            return {...state, ...action.detail};

        case SET_DETAIL_FORM_TYPE:
            return !formType ? state : {...state, formType: formType };

        case SET_ASSET_FILTER_VALUE:
            return {...state, assetFilter: (value: string)};

        case SET_TAG_FILTER_VALUE:
            return {...state, tagFilter: (value: string)};

        case SET_RESOURCE_NAME_VALUE:
            return { ...state, name: (value: string) };

        case SET_RESOURCE_DESCRIPTION_VALUE:
            return { ...state, description: (value: string) };

        case ADD_ASSET_TO_SELECTED:
            return !value ? state : { ...state, selectedAssets: [...state.selectedAssets, value]};

        case ADD_TAG_TO_SELECTED:
            return !value ? state : { ...state, selectedTags: [...state.selectedTags, value]};

        case REMOVE_ASSET_FROM_SELECTED:
            return !value ? state : {
                ...state,
                selectedAssets: state.selectedAssets.filter(selected => selected !== value)
            };

        case REMOVE_TAG_FROM_SELECTED:
            return !value ? state : {
                ...state,
                selectedTags: state.selectedTags.filter(selected => selected !== value)
            };

        case SET_ASSET_GROUP_SELECTION:
            return !value ? state : {...state, group: (value: string)};

        case SET_NODE_SHAPE_SELECTION:
            return !value ? state : {...state, nodeShape: (value: string)};

        case SET_NODE_COLOR_SELECTION:
            return !value ? state : {...state, nodeColor: (value: string)};

        case SET_FORM_EDIT_TRUE:
            return {...state, edit: true};

        case SET_FORM_EDIT_FALSE:
            return {...state, edit: false};


        case SET_SOURCE_VALUE:
            return {...state, source: (value: string)};

        case SET_TARGET_VALUE:
            return {...state, target: (value: string)};

        case SET_ERROR_VALUE:
            return {...state, errorMsg: (value: string)};

        case SET_ERRORS:
            return {...state, errors: (value: string)};

        case CLEAR_ERRORS:
            return {...state, errors: {}, errorMsg: ""}


        default:
            return state;
    }
}