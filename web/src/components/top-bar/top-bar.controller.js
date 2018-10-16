import * as actions from './top-bar.actions';
import * as graphHelpers from '../../common/graph-helpers';
import * as configs from './top-bar.config';


function mapStateToProps(state, props) {
    return {
        ...props,
        layoutOptions: configs.layoutOptions,
        selectedLayout: state.app.graph.selectedLayout,
        refreshLayout: () => graphHelpers.updateLayout(state.graph, state.app.graph.selectedLayout),
    }
}

function dispatchToProps(dispatch) {
    return {
        toggleCollapseMenu: () => dispatch(actions.toggleCollapseMenu()),
        setGraphLayout: (layout) => dispatch(actions.setGraphLayout(layout)),
    }
}

export default {
    mapStateToProps: (state, props) => mapStateToProps(state, props),
    dispatchToProps: (dispatch) => dispatchToProps(dispatch),
}