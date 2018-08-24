import * as graphHelpers from '../common/graph-helpers';
import * as activeMappingActions from './active-mapping.actions';
import * as activeDetailActions from './active-detail.actions';
import * as appActions from './app.actions';

/**
 *  Compound actions.
 */

export function clearGraphAndActiveMapping(){
   return function(dispatch, getState){
       dispatch(activeMappingActions.clearActiveMappingSelection());
       graphHelpers.clearGraph(getState().graph);
   }
}

export function closeFormAndSetActiveDetail(activeDetail){
    return function(dispatch){
        dispatch(activeDetailActions.setActiveDetail(activeDetail));
        dispatch(appActions.cancelEdit())
    }
}