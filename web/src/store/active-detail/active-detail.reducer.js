import * as types from './active-detail.action-types';
import initialState from '../../reducers/initialState';
import * as resourceTypes from '../../constants/types';

function categoryReducer(state = initialState.activeDetail, action) {
    switch (action.type) {
        case types.SET_ACTIVE_DETAIL:
            return action.activeDetail;

        case types.CLEAR_ACTIVE_DETAIL:
            return {type: resourceTypes.EMPTY, data:"no selection", description: ""}
        default:
            return state;
    }
}



export default categoryReducer;