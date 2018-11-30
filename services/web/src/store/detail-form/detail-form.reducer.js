//  @flow

import {SET_DETAIL_FORM_TYPE, SET_RESOURCE_FILTER_VALUE} from "./detail-form.action-types";

const initialState = {
    resourceFilter: "",
    selectedResources: [],
    tagFilter: "",
    selectedTags: [],
    name: "",
    description: "",
    errors: {},
    type: "formType",
    selections: true, // if there's the selects
    shape: "ellipse",
    color: "black",
    group: null
};

export default function (state = initialState, action) {

    const {formType, value} = action;

    switch (action.type) {

        case SET_DETAIL_FORM_TYPE:
            if (!formType) {
               return state;
            }
            return {...state, formType: formType}

        case SET_RESOURCE_FILTER_VALUE:
            if (!value) {
                return state;
            }
            return {...state, resourceFilter: (value: string)};

        default:
            return state;
    }
}