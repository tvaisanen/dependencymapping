import * as types from './active-detail.action-types';
import * as resourceTypes from '../../constants/types';
import * as _ from 'lodash';


export function setActiveDetail(activeDetail) {
    return {type: types.SET_ACTIVE_DETAIL, activeDetail}
}

export function setActiveMappingAsDetail(activeDetail) {

    return function (dispatch, getState) {

        console.group(`setActiveMappingAsDetail()`);
        console.info(activeDetail);

        const {assets, tags} = getState();

        const fullDetail = {
                type: activeDetail.type,
                data: {
                    ...activeDetail.data,
                    assets: assets.filter(r => _.includes(activeDetail.data.assets, r.name)),
                    tags: tags.filter(t => _.includes(activeDetail.data.tags, t.name))
                }
            };
        console.info(fullDetail);
        dispatch(setActiveDetail(fullDetail));

        console.groupEnd();
    }
}


export function setActiveDetailWithResourceCollecting(activeDetail) {
    /**
     * Todo: refactor this function
     */
    const {data} = activeDetail;

    if (activeDetail.type === resourceTypes.ASSET) {
        return function (dispatch, getState) {

            const {assets, tags} = getState();

            const parseAssets = data.connected_to ? _.isString(data.connected_to[0]) : [];
            const parseTags = data.tags ? _.isString(data.tags[0]) : [];

            const collectedDetail = {
                type: activeDetail.type,
                data: {
                    ...data,
                    connected_to: parseAssets ?
                        assets.filter(r => _.includes(data.connected_to, r.name))
                        : data.connected_to,
                    tags: parseTags ?
                        tags.filter(t => _.includes(data.tags, t.name))
                        : data.tags
                }
            };
            console.info(collectedDetail);
            dispatch(setActiveDetail(collectedDetail));

            console.groupEnd();
        }
    }
    if (activeDetail.type === resourceTypes.CONNECTION) {
        return function (dispatch, getState) {

            const {assets, tags} = getState();

            // get source and target as objects from strings
            const assetFilter = [activeDetail.data.source, activeDetail.data.target];

            const filteredAssets = assets.filter(asset => _.includes(assetFilter, asset.name));

            const first = filteredAssets.pop();

            // check which one of the filtered is the source and assign both
            const endPoints = first.name === activeDetail.data.source ?
                {source: first, target: filteredAssets.pop()}
                : {source: filteredAssets.pop(), target: first};


            const parseTags = data.tags ? _.isString(data.tags[0]) : [];

            const collectedDetail = {
                type: activeDetail.type,
                data: {
                    ...data,
                    source: endPoints.source,
                    target: endPoints.target,
                    tags: parseTags ?
                        tags.filter(t => _.includes(data.tags, t.name))
                        : data.tags
                }
            };

            dispatch(setActiveDetail(collectedDetail));
        }
    }

    // this is run for tag?
    return setActiveDetail(activeDetail);
}

export function clearActiveDetail() {
    return {type: types.CLEAR_ACTIVE_DETAIL};
}

