import React from 'react';
import * as s from './resource-detail.styled'

export const DetailLists = ({lists, setActiveDetail}) => {
    return lists && lists.length >= 1 ?
        lists.map((list, i) => detailListFragment({...list, setActiveDetail, i}))
        : null;
};

export const ListItems = ({items, type, clickHandler}) => {
    return items ?
        items.map((item, i) => (
            <s.ListItem
            key={i}
            onClick={() => clickHandler({
                data: item,
                type: type
            })}>{item.name}
        </s.ListItem>)) : null;
};

export const detailListFragment = ({label, items, type, setActiveDetail, i}) => (
    <React.Fragment key={i}>
        <s.ListLabel>{label}</s.ListLabel>
        <s.List>
            <ListItems
                items={items}
                type={type}
                clickHandler={setActiveDetail}
            />
        </s.List>
    </React.Fragment>
);
