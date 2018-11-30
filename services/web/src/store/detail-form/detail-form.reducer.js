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
    SET_NODE_SHAPE_SELECTION
} from "./detail-form.action-types";

const initialState = {
    assetFilter: "",
    selectedAssets: [],
    tagFilter: "",
    selectedTags: [],
    name: "",
    description: "",
    errors: {},
    type: "formType",
    selections: true, // if there's the selects
    nodeShape: "ellipse",
    nodeColor: "black",
    group: null
};

export default function (state = initialState, action) {

    const {formType, selection, value} = action;

    switch (action.type) {

        case SET_DETAIL_FORM_TYPE:
            return !formType ? state : {...state, formType: formType };

        case SET_ASSET_FILTER_VALUE:
            return !value ? state : {...state, assetFilter: (value: string)};

        case SET_TAG_FILTER_VALUE:
            return !value ? state : {...state, tagFilter: (value: string)};

        case SET_RESOURCE_NAME_VALUE:
            return !value ? state : { ...state, name: (value: string) };

        case SET_RESOURCE_DESCRIPTION_VALUE:
            return !value ? state : { ...state, description: (value: string) };

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

        default:
            return state;
    }
}