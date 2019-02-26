import * as types from './active-detail.action-types';
import * as resourceTypes from '../../constants/types';
import * as _ from 'lodash';
import {ASSET, CONNECTION, MAPPING, TAG} from "../../constants/types";
import {Asset, Connection, Mapping, Tag} from "../types";
import {deleteConnection, getAssetByName} from "..";


export function setActiveDetail(activeDetail) {
    return {type: types.SET_ACTIVE_DETAIL, activeDetail}
}

export function setMappingAsActiveDetail(activeDetail) {

    return function (dispatch, getState) {

        const {assets, tags} = getState();

        const fullDetail = {
            type: activeDetail.type,
            data: {
                ...activeDetail.data,
                assets: assets
                    .filter(
                        r => _.includes(
                            activeDetail.data.assets,
                            r.name
                        )
                    ),
                tags: tags.filter(t => _.includes(activeDetail.data.tags, t.name))
            }
        };

        dispatch(setActiveDetail(fullDetail));

    }
}

export function setConnectionAsActiveDetail(activeDetail) {
    /**
     *  Set connection detail as active detail
     */
    return function (dispatch, getState) {

        try {
            // Todo: continue here!
            // catches when connection dangling
            // without an source/target asset

            const {data} = activeDetail;
            const {assets, tags} = getState();

            // get source and target as objects from strings
            const assetFilter = [activeDetail.data.source, activeDetail.data.target];

            const filteredAssets = assets.filter(asset => _.includes(assetFilter, asset.name));

            if (filteredAssets.length < 2) {
                // the assets have been deleted
                // in this situation the assets
                // connections should have been
                // deleted too
                dispatch(deleteConnection({form: activeDetail.data}));
                alert('this connection should have already been deleted');
                return null;
            }

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
        } catch (err) {
            console.error(err)
            alert("set connection as detail catch")
        }
    }
}

export function setAssetAsActiveDetail(activeDetail) {
    return function (dispatch, getState) {
        const {data} = activeDetail;

        const {assets, tags} = getState();

        const parseAssets = data.connected_to ? _.isString(data.connected_to[0]) : [];
        const parseTags = data.tags ? _.isString(data.tags[0]) : [];


        // active detail needs the
        // assets and tags in more detail
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

        // console.debug(collectedDetail);

        dispatch(setActiveDetail(collectedDetail));


    }
}


type SetAsActiveProps = {
    type: ASSET | CONNECTION | MAPPING | TAG,
    data: Asset | Connection | Mapping | Tag
}


export function setAsActiveDetail(activeDetail: SetAsActiveProps) {

    return function (dispatch) {
        switch (activeDetail.type) {
            case resourceTypes.ASSET:
                dispatch(setAssetAsActiveDetail(activeDetail));
                break;
            case resourceTypes.CONNECTION:
                dispatch(setConnectionAsActiveDetail(activeDetail));
                break;
            case resourceTypes.MAPPING:
                dispatch(setMappingAsActiveDetail(activeDetail));
                break;
            default:
                dispatch(setActiveDetail(activeDetail))
        }
    }
}

export function clearActiveDetail() {
    return {type: types.CLEAR_ACTIVE_DETAIL};
}

