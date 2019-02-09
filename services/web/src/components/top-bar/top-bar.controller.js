import * as actions from './top-bar.actions';
import * as graphHelpers from '../../common/graph-helpers';
import * as configs from './top-bar.config';


function mapStateToProps(state, props) {
    return {
        ...props,
        infoMessage: state.app.info,
        layoutOptions: configs.layoutOptions,
        selectedLayout: state.app.graph.selectedLayout,
        refreshLayout: () => graphHelpers.updateLayout(state.graph, state.app.graph.selectedLayout),
    }
}

function dispatchToProps(dispatch) {
    return {
        toggleCollapseMenu: () => dispatch(actions.onToggleCollapseMenu()),
        setGraphLayout: (layout) => dispatch(actions.onSetGraphLayout(layout)),
    }
}

export default {
    mapStateToProps: (state, props) => mapStateToProps(state, props),
    dispatchToProps: (dispatch) => dispatchToProps(dispatch),
}