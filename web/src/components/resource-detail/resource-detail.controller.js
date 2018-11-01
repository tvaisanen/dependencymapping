import * as types from './../../constants';
import * as resourceHelpers from "./../../common/resource-helpers";
import * as actionCreators from './../../actions';
import {bindActionCreators} from 'redux';
import * as activeDetailActions from '../../store/active-detail/active-detail.actions';
import * as activeMappingActions from '../../store/active-mapping/active-mapping.actions';


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


const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(actionCreators, dispatch),
    setActiveDetail: (activeDetail) => dispatch(activeDetailActions.setActiveDetailWithResourceCollecting(activeDetail)),
    addResourceToActiveMapping: (resource) => dispatch(activeMappingActions.addResourceToActiveMapping(resource)),
    removeResourceFromActiveMapping: (resource) => dispatch(activeMappingActions.removeResourceFromActiveMapping(resource))
});

export default {
    stateToProps: (state, props) => stateToProps(state, props),
    dispatchToProps: (dispatch) => mapDispatchToProps(dispatch)
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
