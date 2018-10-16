import * as actions from './../../actions';
import * as views from '../../constants/views';
import * as activeDetailActions from '../../store/active-detail/active-detail.actions'
import * as dependencyMapHelpers from '../../common/dependency-map.helpers';

export function onMappingItemClick(mapping){
    return function(dispatch, getState){
        dependencyMapHelpers.loadDependencyMap(
            mapping,
            getState().graph,
            getState().mappings,
            getState().resources,
            dispatch,
            getState().app.graph.selectedLayout
        );
        //dispatch(actions.loadActiveMapping(mapping));
        dispatch(actions.setBottomPanelView(views.BROWSE));
    }
}

export function setActiveDetail(activeDetail){
    return function (dispatch) {
        dispatch(activeDetailActions.setActiveDetail(activeDetail));
    }
}

export function onActiveAssetClick(activeDetail){
    return function (dispatch){
        dispatch(activeDetailActions.setActiveDetail(activeDetail));
        dispatch(actions.setBottomPanelView(views.BROWSE));
    }
}