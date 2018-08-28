import * as actions from './../../actions';
import * as views from '../../constants/views';
import * as dependencyMapHelpers from '../../common/dependency-map.helpers';

export function onMappingItemClick(mapping){
    return function(dispatch, getState){
        dependencyMapHelpers.loadDependencyMap(
            mapping,
            getState().graph,
            getState().mappings,
            getState().resources,
            dispatch
        );
        //dispatch(actions.loadActiveMapping(mapping));
        dispatch(actions.setBottomPanelView(views.BROWSE));
    }
}

export function setActiveDetail(activeDetail){
    return function (dispatch) {
        dispatch(actions.setActiveDetail(activeDetail));
    }
}

export function onActiveAssetClick(activeDetail){
    return function (dispatch){
        dispatch(actions.setActiveDetail(activeDetail));
        dispatch(actions.setBottomPanelView(views.BROWSE));
    }
}