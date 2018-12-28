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

        dispatch(
            activeDetailActions.setAsActiveDetail(activeDetail));
        dispatch(closeEdit());
        // if active detail is mapping

        const isMapping = activeDetail.type === types.MAPPING;

        if ( isMapping && activeDetail.setDetail) {
            // if the detail is a type of MAPPING
            // it needs to be loaded
            dependencyMapHelpers.loadDependencyMap(
                activeDetail.data.name || "None",
                getState().graph,
                getState().mappings,
                getState().assets,
                dispatch,
                getState().app.graph.selectedLayout
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

