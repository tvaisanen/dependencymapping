import * as actions from './../../actions';
import * as views from '../../constants/views';
import * as activeDetailActions from '../../store/active-detail/active-detail.actions'
import * as dependencyMapHelpers from '../../common/dependency-map.helpers';

export function onMappingItemClick(mappingName){
    return function(dispatch){
        dispatch(dependencyMapHelpers.loadDependencyMap(mappingName));
        dispatch(actions.setBottomPanelView(views.BROWSE));
    }
}

export function setActiveDetail(activeDetail){
    return function (dispatch) {
        dispatch(activeDetailActions.setActiveDetail(activeDetail));
    }
}

export function onActiveAssetClick(activeDetail){
    return function (dispatch, getState){
        console.group(`onActiveAssetClick(activeDetail)`);
        /**
         * Refactoring
         */

        const { assets } = getState();

        // should be only one with the same name -> filter[0]
        const assetData = assets.filter(r => r.name === activeDetail.data)[0];
        const activeDetailWithData = {
           data: assetData,
           type: activeDetail.type
        };
        dispatch(activeDetailActions.setActiveDetailWithResourceCollecting(activeDetailWithData));
        dispatch(actions.setBottomPanelView(views.BROWSE));
        console.groupEnd();
    }
}

export function setActiveMapping(mapping){
    return function (dispatch) {
        console.group("setActiveMapping");



        console.groupEnd();
    }
}