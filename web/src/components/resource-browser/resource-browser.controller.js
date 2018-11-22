import * as appActions from './../../actions/app.actions';
import * as resourceHelpers from '../../common/resource-helpers';
import * as activeDetailActions from '../../store/active-detail/active-detail.actions';
import * as activeMappingActions from '../../store/active-mapping/active-mapping.actions';

const mapStateToProps = (state, ownProps = {}) => {

    const sortedAssets = resourceHelpers.sortResources({resources: state.assets});

    // console.info(state.assets);
    // console.info(state.tags);

    // console.log(`assets loaded: ${state.assets ? "yes" : "no"}`);
    // console.log(`tags loaded: ${state.tags ? "yes" : "no"}`);

    return {
        cy: state.graph,
        assets: sortedAssets || [],
        tags: state.tags || [],
        activeMapping: state.activeMapping,
        activeDetail: state.activeDetail.data,
        activeDetailType: state.activeDetail.type
    }
};


const mapDispatchToProps = dispatch => ({
    // ...bindActionCreators(actionCreators, dispatch),
    editDetail: () => dispatch(appActions.editDetail()),
    setActiveDetail: (activeDetail) => dispatch(activeDetailActions.setActiveDetailWithResourceCollecting(activeDetail)),
    addResourceToActiveMapping: (resource) => dispatch(activeMappingActions.addResourceToActiveMapping(resource)),
    removeResourceFromActiveMapping: (resource) => dispatch(activeMappingActions.removeResourceFromActiveMapping(resource))
});

export default {
    mapStateToProps,
    mapDispatchToProps
};