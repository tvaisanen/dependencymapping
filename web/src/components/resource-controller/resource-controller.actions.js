import * as activeDetailActions from '../../store/active-detail/active-detail.actions';
import * as appActions from '../../actions/app.actions';
import * as types from '../../constants/types';
import * as views from '../../constants/views';
import * as dependencyMapHelpers from "../../common/dependency-map.helpers";

export function closeFormAndSetActiveDetail(activeDetail) {
    return function (dispatch, getState) {
        console.group("Debug !");
        console.info(activeDetail);
        console.groupEnd();
        dispatch(activeDetailActions.setActiveDetail(activeDetail));
        dispatch(closeEdit());
        // if active detail is mapping

        const isMapping = activeDetail.type === types.MAPPING;

        if ( isMapping && activeDetail.setDetail) {
            alert("this should not happen when deleting a mapping")
            dependencyMapHelpers.loadDependencyMap(
                activeDetail.data.name || "None",
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

