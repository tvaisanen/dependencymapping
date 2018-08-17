import * as graphHelpers from './../../common/graph-helpers';
import * as actions from './../../actions';

function stateToProps(state, props){
    return {
        ...props,
        activeMapping: state.activeMapping,
        downloadImage: () => graphHelpers.downloadPng(state.graph),
        //clearGraphSelection: () => graphHelpers.clearGraph(state.graph),
        updateLayout: () => graphHelpers.updateLayout(state.graph),
    };
}

function dispatchToProps(dispatch){
    return {
        saveMapping: (activeMapping) => dispatch(actions.updateMapping(activeMapping)),
        clearGraphSelection: () => dispatch(actions.clearGraphAndActiveMapping())
    }
}

export default {
    stateToProps: (state, props) => stateToProps(state, props),
    dispatchToProps: (dispatch) => dispatchToProps(dispatch),
}

