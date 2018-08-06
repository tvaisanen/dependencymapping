/**
 * Controller for lists holding mappings and active mapping data
 */
import {
    hoverIndicationOff, hoverIndicationOn
} from '../common/graph-helpers';
import * as actions from '../actions';

export default {
    getMappingMenuProps: (props) => getMappingMenuProps(props),
    getActiveMappingResourceMenuProps: (props) => getActiveMappingResourceMenuProps(props),
}

function dispatchMappingMenuTransactions(dispatch){
    return {
        loadActiveMapping: (mapping) => dispatch(actions.loadActiveMapping(mapping)),
    }
}

function getMappingMenuProps(props){
    return {...props};
}

function getActiveMappingResourceMenuProps(props){
    return {...props};
}


const panelInstructions = [
    {
        title: "Mappings",
        items: {} ,//mappings,
        onItemClick: {},//loadDependencyMapping,{}
        onMouseOver:{},// null,
        onMouseOut:{},// null,
        selected: {},//type === types.MAPPING ? activeDetail.data.name : false
    },
    {
        title:{},// activeMapping.name ? this.props.activeMapping.name : 'Select Mapping',
        items:{},// activeMapping.resources,
        onItemClick:{},// setResourceDetail,
        onMouseOver: (cy, id) => hoverIndicationOn(cy, id),
        onMouseOut: (cy, id) => hoverIndicationOff(cy, id),
        selected: {},//type === types.MAPPING ? activeDetail.data.name : false
    },
]
