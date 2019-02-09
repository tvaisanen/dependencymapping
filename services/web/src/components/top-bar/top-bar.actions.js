import { setGraphLayout, toggleCollapseMenu } from '../../store/ui/ui.actions';

export function onSetGraphLayout(layout) {
    console.info("top-bar.actions.setGraphLayout("+layout+");");
    return function (dispatch, getState) {
        dispatch(setGraphLayout(layout))
    }
};

export function onToggleCollapseMenu() {
    return function (dispatch) {
       dispatch(toggleCollapseMenu());
    }
}