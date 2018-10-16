import * as types from './active-detail.action-types';

export function setActiveDetail(activeDetail) {
    return {type: types.SET_ACTIVE_DETAIL, activeDetail}
}

export function clearActiveDetail(){
    return {type: types.CLEAR_ACTIVE_DETAIL};
}

