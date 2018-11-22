/**
 * Controller for lists holding mappings and active mapping data
 */
import {
    hoverIndicationOff, hoverIndicationOn
} from './../../common/graph-helpers';

import * as actions from './mapping-menu.actions';

export default {
    stateToProps: (props) => getMappingMenuProps(props),
    dispatchToProps: (props) => dispatchToProps(props),
}

function dispatchToProps(dispatch) {
    return {
        setActiveDetail: (activeDetail) => dispatch(actions.setActiveDetail(activeDetail)),
        onActiveAssetClick: (activeDetail) => dispatch(actions.onActiveAssetClick(activeDetail)),
        onMappingItemClick: (mapping) => dispatch(actions.onMappingItemClick(mapping)),
    }
}

function getMappingMenuProps(state) {
    const {assets} = state.activeMapping;
    // sort resources by name
    return {
        mappings: state.mappings,
        activeMapping: state.activeMapping,
        activeDetail: state.activeDetail,
        mappingNameList: state.mappings.map(m => m.name),
        activeResourceNameList: assets ? assets.map(r => r.name) : [],
        // activeResourceNameList: state.activeMapping.resources ? state.activeMapping.resources.map(r => r.name).sort((a, b) => (a.name - b.name)) : [],
        hoverResourceOn: (id) => hoverIndicationOn(state.graph, id),
        hoverResourceOff: (id) => hoverIndicationOff(state.graph, id),
    };
}


