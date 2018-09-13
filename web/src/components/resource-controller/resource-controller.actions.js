import * as activeDetailActions from '../../actions/active-detail.actions';
import * as appActions from '../../actions/app.actions';
import * as types from '../../constants/types';
import * as views from '../../constants/views';
import * as dependencyMapHelpers from "../../common/dependency-map.helpers";

export function closeFormAndSetActiveDetail(activeDetail) {
    console.groupCollapsed("closeFormAndSetActiveDetail(" + activeDetail.data.name + ")");
    console.info(activeDetail);
    console.groupEnd();
    return function (dispatch, getState) {
        dispatch(activeDetailActions.setActiveDetail(activeDetail));
        dispatch(closeEdit());
        // if active detail is mapping
        if (activeDetail.type === types.MAPPING) {
            dependencyMapHelpers.loadDependencyMap(
                activeDetail.data.name,
                getState().graph,
                getState().mappings,
                getState().resources,
                dispatch
            )
        }

    }
}

export function closeEdit() {
    return function (dispatch, getState) {
        dispatch(appActions.setEditFalse());
        dispatch(appActions.setBottomPanelView(views.BROWSE))
    }
}

