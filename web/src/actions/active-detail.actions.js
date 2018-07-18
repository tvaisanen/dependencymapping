import * as types from './actionTypes';

export function setActiveDetail(activeDetail) {
    console.info("setActiveDetail");
    console.info(activeDetail);
    return {type: types.SET_ACTIVE_DETAIL, activeDetail}
}

