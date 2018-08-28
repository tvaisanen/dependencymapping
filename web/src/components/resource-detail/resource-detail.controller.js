import * as types from './../../constants';
import * as resourceHelpers from "./../../common/resource-helpers";
import * as actionCreators from './../../actions';
import {bindActionCreators} from 'redux';

function stateToProps(state) {
    const {
        detailType,
        activeDetail,
        setDetail
    } = state;

    const items = activeDetail.type === types.TAG ?
        resourceHelpers
            .getAllResourcesWithTag({
                tagId: activeDetail.data.name,
                resources: state.resources
            }) : false;

    const lists = getLists({activeDetail, detailType, setDetail, items});

    return {...state, lists}
}

function dispatchToProps(dispatch){
    return bindActionCreators(actionCreators, dispatch);
}

export default {
    stateToProps: (state, props) => stateToProps(state, props),
    dispatchToProps: (dispatch) => dispatchToProps(dispatch)
};

const getLists = ({activeDetail, setDetail, items}) => {
    return listCompositionInstructions[activeDetail.type].map(data => ({
            label: data.label,
            onClick: setDetail,
            items: data.key ? activeDetail.data[data.key] : items,
            type: data.type
        })
    );
};


const listCompositionInstructions = {
    /**
     * Define what keys are listed in the detail view
     *
     * label: List title
     * key: { key: [...values] }
     * type: type of the listed items
     *
     * */
    [types.ASSET]: [
        {label: "Connections", key: "connected_to", type: types.ASSET},
        {label: "Tags", key: "tags", type: types.TAG}
    ],
    [types.MAPPING]: [
        {label: "Resources", key: "resources", type: types.ASSET},
        {label: "Tags", key: "tags", type: types.TAG}
    ],
    [types.TAG]: [
        {label: "Resources", key: false, type: types.ASSET}
    ],
    [types.EMPTY]: [],
};
