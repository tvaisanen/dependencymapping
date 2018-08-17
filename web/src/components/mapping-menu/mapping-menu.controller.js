/**
 * Controller for lists holding mappings and active mapping data
 */
import {
    hoverIndicationOff, hoverIndicationOn
} from './../../common/graph-helpers';

import * as actions from './../../actions';

export default {
    stateToProps: (props) => getMappingMenuProps(props),
    dispatchToProps: (props) => dispatchToProps(props),
}

function dispatchToProps(dispatch){
    return {
        setActiveDetail: (activeDetail) => dispatch(actions.setActiveDetail(activeDetail)),
        loadActiveMapping: (mapping) => dispatch(actions.loadActiveMapping(mapping)),
    }
}

function getMappingMenuProps(props){
    return {
        mappings: props.mappings,
        activeMapping: props.activeMapping,
        activeDetail: props.activeDetail,
        mappingNameList: props.mappings.map(m => m.name),
        activeResourceNameList: props.activeMapping.resources.map(r => r.name),
        hoverResourceOn: (id) => hoverIndicationOn(props.graph, id),
        hoverResourceOff: (id) => hoverIndicationOff(props.graph, id),
    };
}


