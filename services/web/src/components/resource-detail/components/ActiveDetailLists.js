import React from 'react';
import { connect } from 'react-redux';

import * as types from '../../../constants';
import * as activeDetailActions from '../../../store/active-detail/active-detail.actions';
import * as resourceHelpers from "../../../common/resource-helpers";

import { ListBlock, ListItem, List, ListLabel, ListWrapper } from "../resource-detail.styled";

export const ActiveDetailLists = ({lists, setActiveDetail}) => {
    return lists && lists.length >= 1 ?
        <ListBlock>
            {lists.map((list, i) => detailListFragment({...list, setActiveDetail, i}))}
        </ListBlock>
        : null;
};

export const ListItems = ({items, type, clickHandler}) => {
    return items ?
        items.map((item, i) => (
            <ListItem
                key={i}
                onClick={() => clickHandler({
                    data: item,
                    type: type
                })}>{item.name ? item.name : item.target}
            </ListItem>)) : null;
};

export const detailListFragment = ({label, items, type, setActiveDetail, i}) => (
    <ListWrapper id={"list-wrapper"} key={i}>
        <ListLabel>{label}</ListLabel>
        <List>
            <ListItems
                items={items}
                type={type}
                clickHandler={setActiveDetail}
            />
        </List>
    </ListWrapper>
);

function mapStateToProps(state) {
    const {
        detailType,
        activeDetail,
        setDetail,
        connections
    } = state;

    const assetsWithTag = activeDetail.type === types.TAG ?
        resourceHelpers
            .getAllResourcesWithTag({
                tagName: activeDetail.data.name,
                resources: state.assets
            }) : false;

    const assetConnections = activeDetail.type === types.ASSET ?
        connections.filter(connection => connection.source === activeDetail.data.name)
        : null;

    const itemsMap = {
        [types.TAG]: assetsWithTag,
        [types.ASSET]: assetConnections
    };

    const items = itemsMap[activeDetail.type];

    const lists = getLists({activeDetail, detailType, setDetail, items});

    // console.log(lists)

    return {lists}
}


const mapDispatchToProps = dispatch => ({
    setActiveDetail: (activeDetail) => dispatch(
        activeDetailActions.setAsActiveDetail(activeDetail)
    ),
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ActiveDetailLists)

const getLists = ({activeDetail, setDetail, items}) => {
    return listCompositionInstructions[activeDetail.type].map(data => ({
            label: data.label,
            onClick: setDetail,
            items: data.key ? activeDetail.data[data.key] : items,
            type: data.type,
        })
    );
};


const listCompositionInstructions = {
    /**
     * Define what keys are listed in the detail view
     *
     * label: List title
     * key: { key: [...values] }
     * type: type of the listed items
     *
     * Read the instructions as following
     * for type ASSET parse two lists for
     * detail view. First list is labeled
     * as "Connections" and items for this
     * list is taken from asset.connected_to: [].
     * Give this list the type definition
     * types.ASSET
     *
     * */

    [types.ASSET]: [
        {
            label: "Connections",
            //key: "connected_to",
            key: false,
            type: types.CONNECTION
        },
        {
            label: "Tags",
            key: "tags",
            type: types.TAG
        }
    ],
    [types.MAPPING]: [
        {label: "Assets", key: "assets", type: types.ASSET},
        {label: "Tags", key: "tags", type: types.TAG}
    ],
    [types.TAG]: [
        // key: false -> the list items need to be derived
        // from the assets
        {label: "Assets", key: false, type: types.ASSET }
    ],
    [types.CONNECTION]: [
        {
            label: "Tags",
            key: "tags",
            type: types.TAG,
        }
    ],
    [types.EMPTY]: [],
};


