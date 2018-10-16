import {bindActionCreators} from 'redux';
import * as actionCreators from './../../actions/index';
import * as resourceHelpers from '../../common/resource-helpers';
import * as activeDetailActions from '../../store/active-detail/active-detail.actions';
import * as activeMappingActions from '../../store/active-mapping/active-mapping.actions';

const mapStateToProps = (state, ownProps = {}) => {

    const sortedResources = resourceHelpers.sortResources({resources: state.resources});

    return {
        cy: state.graph,
        resources: sortedResources,
        tags: state.tags,
        activeMapping: state.activeMapping,
        activeDetail: state.activeDetail.data,
        activeDetailType: state.activeDetail.type
    }
};

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(actionCreators, dispatch),
    setActiveDetail: (activeDetail) => dispatch(activeDetailActions.setActiveDetail(activeDetail)),
    addResourceToActiveMapping: (resource) => dispatch(activeMappingActions.addResourceToActiveMapping(resource)),
    removeResourceFromActiveMapping: (resource) => dispatch(activeMappingActions.removeResourceFromActiveMapping(resource))
});

export default {
    mapStateToProps,
    mapDispatchToProps
};