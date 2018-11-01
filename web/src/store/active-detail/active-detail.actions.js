import * as types from './active-detail.action-types';
import * as resourceTypes from '../../constants/types';
import * as _ from 'lodash';

export function setActiveDetail(activeDetail) {

    return {type: types.SET_ACTIVE_DETAIL, activeDetail}
}

export function setActiveDetailWithResourceCollecting(activeDetail) {
    const {data} = activeDetail;

    if (activeDetail.type === resourceTypes.ASSET) {
        return function (dispatch, getState) {

            const parseAssets = _.isString(data.connected_to[0]);
            const parseTags = _.isString(data.tags[0]);
            const collectedDetail = {
                type: activeDetail.type,
                data: {
                    ...data,
                    connected_to: parseAssets ?
                        getState().resources.filter(r => _.includes(data.connected_to, r.name))
                        : data.connected_to,
                    tags: parseTags ?
                        getState().tags.filter(t => _.includes(data.tags, t.name))
                        : data.tags
                }
            };
            console.info(collectedDetail);
            dispatch(setActiveDetail(collectedDetail));

            console.groupEnd();
        }
    }
    return setActiveDetail(activeDetail);
}

export function clearActiveDetail() {
    return {type: types.CLEAR_ACTIVE_DETAIL};
}

