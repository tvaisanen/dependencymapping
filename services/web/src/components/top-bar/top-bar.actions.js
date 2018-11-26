import * as appActions from '../../actions/app.actions';

export function setGraphLayout(layout) {
    console.info("top-bar.actions.setGraphLayout("+layout+");");
    return function (dispatch, getState) {
        dispatch(appActions.setGraphLayout(layout))
    }
};

export function toggleCollapseMenu() {
    return function (dispatch) {
       dispatch(appActions.toggleCollapseMenu());
    }
}