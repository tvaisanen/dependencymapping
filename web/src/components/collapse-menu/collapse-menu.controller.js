import * as graphHelpers from './../../common/graph-helpers';
import * as actions from './collapse-menu.actions';



function stateToProps(state, props) {
    return {
        ...props,
        visible: state.app.showCollapseMenu,
        activeMapping: state.activeMapping,
    };
}

function dispatchToProps(dispatch) {
    return {
        downloadImage: () => dispatch(actions.downloadImage()),
        saveMapping: () => dispatch(actions.saveMapping()),
        clearGraphSelection: () => dispatch(actions.clearGraph()),
        logout: () => dispatch(actions.logout())
    }
}

export default {
    stateToProps: (state, props) => stateToProps(state, props),
    dispatchToProps: (dispatch) => dispatchToProps(dispatch),
}

