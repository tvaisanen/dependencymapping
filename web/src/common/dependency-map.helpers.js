import * as graphHelpers from './graph-helpers'
import * as activeMappingActions from '../actions/active-mapping.actions'
import * as activeDetailActions from '../actions/active-detail.actions';
import * as parser from './parser';
import * as resourceHelpers from './graph-helpers';
import * as types from '../constants/types';
import * as _ from 'lodash';

export function getMappingById(mapId, mappings){
    return mappings.filter(g => g.name === mapId)[0];
}

export function loadDependencyMap(mapId, cy, mappings, assets, dispatch){
        // load graph resources to the active mapping

        // current state of cy graph needs to be cleared
        graphHelpers.clearGraph(cy);
        const mapping = getMappingById(mapId, mappings);

        // By default this is an array of objects.
        let resources = mapping ? mapping.resources : [];

        console.info(resources);
        console.info(mapping);

        // Set mapping as active.
        dispatch(activeMappingActions.loadActiveMappingResources(mapping));

        /**
         * This is because at the moment there's no back end solution.
         *  Current dev. environment returns mapping resources as objects,
         * which is not too efficient. Preferred method would be using
         * just an array of id's which would be used in a following manner.
         */
        if (_.isString(resources[0])) {
            // if resource is a string
            // map resource id's to resource objects
            resources = parser.filterResourcesByIds({
                ids: resources,
                resources: assets
            });
        }

        // objects for redux state
        const connections = parser.getConnectionsFromResources(resources);

        dispatch(activeMappingActions.setActiveMappingConnections(connections));


        // json for graphing
        const edges = parser.parseEdgeElementsFromResources(resources);


        const nodes = resources.map(resource => resourceHelpers.nodeElementFromResource(resource));
        graphHelpers.addElements(cy, nodes);
        graphHelpers.addElements(cy, edges);

        dispatch(activeDetailActions.setActiveDetail({data: mapping, type: types.MAPPING}));

        // this will be obsolete after refactoring is complete
        //this.setState({detail: mapping, detailType: constants.MAPPING})

        graphHelpers.updateLayout(cy);
};