import React from 'react';
import * as types from '../../constants/types';
import * as s from './resource-detail.styled'


const RenderToggleButton = ({activeDetail, inMap, addToMap, removeFromMap, detail}) => {

    return activeDetail.type === types.ASSET ?
        <ResourceInMappingToggleButton
            inMap={inMap}
            addToMap={addToMap}
            removeFromMap={removeFromMap}
            detail={activeDetail.data}
        /> : null;
}

const ResourceInMappingToggleButton = ({inMap, addToMap, removeFromMap, detail}) => {
    if (inMap) {
        return <s.ActionLink onClick={() => removeFromMap(detail)}>remove from map</s.ActionLink>
    } else {
        return <s.ActionLink onClick={() => addToMap(detail)}>add to map</s.ActionLink>
    }
};


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


export const ResourceDetailHeader = ({activeDetail, isResourceInMap, editDetail, addToMap, removeFromMap}) => {
    return <s.Col>
        {activeDetail.type ?
            <s.Row>
                <small>{activeDetail.type}</small>
                <div>
                </div>
                <span>
                <RenderToggleButton
                    activeDetail={activeDetail}
                    inMap={isResourceInMap}
                    addToMap={addToMap}
                    removeFromMap={removeFromMap}
                    detail={activeDetail.data}
                    detailType={activeDetail.type}
                />
                <s.ActionLink
                    onClick={() => editDetail({
                        resource: activeDetail.data, type: activeDetail.type
                    })}
                > edit </s.ActionLink>
            </span>
            </s.Row>
            : null
        }
        <s.DetailHeader>{activeDetail.data.name}</s.DetailHeader>
    </s.Col>
};
