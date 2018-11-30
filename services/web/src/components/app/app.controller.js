/** ACTIONS **/
import * as activeDetailActions from '../../store/active-detail/active-detail.actions';
import * as activeMappingActions from '../../store/active-mapping/active-mapping.actions';
import * as graphActions from '../../store/graph/graph.actions';
import * as events from '../../common/graph.events';
/************/

const mapStateToProps = (state, ownProps = {}) => {
    return {
        loggedIn: state.auth.loggedIn,
        app: state.app,
        auth: state.auth,
        mappings: state.mappings,
        resources: state.resources,
        dependencies: state.dependencies,
        tags: state.tags,
        activeMapping: state.activeMapping,
        activeDetail: state.activeDetail,
        debug: state.debug,
        cy: state.graph
    }
};

const mapDispatchToProps = (dispatch) => ({
    onNodeClick: (event) => dispatch(events.onNodeClick(event)),
    onNodeMouseOver: (event) => dispatch(events.onNodeMouseOver(event)),
    onNodeMouseOut: (event) => dispatch(events.onNodeMouseOut(event)),
    onCtxClick: (event) => dispatch(events.onCtxClick(event)),
    initGraph: ({eventHandlers}) => dispatch(graphActions.initGraph({eventHandlers})),
    setActiveDetail: (activeDetail) => dispatch(activeDetailActions.setActiveDetail(activeDetail)),
    addActiveMappingResources: (resources) => dispatch(activeMappingActions.addActiveMappingAssets(resources))
});

export default {
    mapStateToProps,
    mapDispatchToProps
}
