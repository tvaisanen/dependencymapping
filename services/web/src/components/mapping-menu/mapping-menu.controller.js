/**
 * Controller for lists holding mappings and active mapping data
 */
import {
    hoverIndicationOff, hoverIndicationOn
} from './../../common/graph-helpers';

import * as actions from './mapping-menu.actions';

export default {
    mapStateToProps: (props) => mapStateToProps(props),
    mapDispatchToProps: (props) => mapDispatchToProps(props),
}

function mapDispatchToProps(dispatch) {
    return {
        setActiveDetail: (activeDetail) => dispatch(actions.setActiveDetail(activeDetail)),
        onActiveAssetClick: (activeDetail) => dispatch(actions.onActiveAssetClick(activeDetail)),
        onMappingItemClick: (mapping) => dispatch(actions.onMappingItemClick(mapping)),
    }
}

function mapStateToProps(state) {
    const {assets} = state.activeMapping;
    // sort resources by name
    return {
        mappings: state.mappings,
        activeMapping: state.activeMapping,
        activeDetail: state.activeDetail,
        mappingNameList: state.mappings.map(m => m.name).sort(),
        activeMappingAssetNameList: assets ? assets.map(r => r.name) : [],
        hoverResourceOn: (id) => hoverIndicationOn(state.graph, id),
        hoverResourceOff:(id) => hoverIndicationOff(state.graph, id),
    };
}


