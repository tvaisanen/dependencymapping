//@flow
import type { Asset, Connection, Tag } from '../../store/types';

import React, {Component} from 'react';
import PropTypes from 'prop-types'; import {connect} from 'react-redux'
import styled from 'styled-components';
import * as l from '../layout';
import * as types from './../../constants/types';
import { ASSET, CONNECTION, TAG } from '../../constants/types';
import {isResourceInMapping,} from './../../common/resource-helpers';
import * as resourceHelpers from './../../common/resource-helpers';
import ResourceDetail from '../resource-detail/ResourceDetailContainer';
import {FilterInputField} from '../common.components';
import resourceBrowserCtrl from './resource-browser.controller';

import {
    ListItemBox,
    ResourceBrowserLayout,
    BrowserContainer,
    ListTab,
    ListTabs,
    ListContainer
} from './resource-browser.styled.js';

// todo: refactor to store

type Selected = ASSET | CONNECTION | TAG

type ListItemProps = {
    item: Asset | Connection | Tag, 
    itemType: Selected, 
    selected: Selected,
    onClick: (any) => void, 
}

type ResourceListProps = {
    selected: Selected;
    listItems: Array<Asset> | Array<Connection> | Array<Tag>,
    onClick: (any)  => void,
    ...ListItemProps

}

const AssetList = (props: ResourceListProps) => (
    props.selected !== ASSET ? null :  
        props.listItems.map((item, i) => (
            <AssetListItem 
                key={i}
                item={item}
                {...props}
            />
        )
    )
)

const ConnectionList = (props: ResourceListProps) => (
    props.selected !== CONNECTION ? null :  
        props.listItems.map((item, i) => (
            <ConnectionListItem 
                key={i}
                item={item}
                {...props}
            />
        )
    )
) 

const TagList = (props: ResourceListProps) => (
    props.selected !== TAG ? null :  
        props.listItems.map((item, i) => (
            <TagListItem 
                key={i}
                item={item}
                {...props}
            />
        )
    )
)


const ResourceList = (props: ResourceListProps) =>(
    <ListContainer>
        <AssetList      {...props}/>
        <ConnectionList {...props}/>
        <TagList        {...props}/>
    </ListContainer>
)


const ListItemByName = (props: ListItemProps) => (
    <ListItemBox
        selected={props.selected}
        onClick={() => 
            props.onClick({
                data: props.item,
                type: props.itemType 
            })
        }
        >{props.item.name}
    </ListItemBox>
);

const AssetListItem = ListItemByName;
const ConnectionListItem = (props: ListItemProps) => <div>
    {`${props.item.source} -> ${props.item.target}`}
</div>
const TagListItem = ListItemByName;

    


const renderList = ({listItems}) => <div/>

type Props = {
   assets: Array<Asset>,
   connections: Array<Connection>,
   tags: Array<Tag>,
   //  todo: specify the following
   activeDetail: any,
   setActiveDetail: (any) => void
}

type State = {
    filterValue: string,
    selected: Selected
}

class ResourceBrowserContainer extends Component <Props, State> {

    state = {
        filterValue: "",
        selected: types.CONNECTION,
    };
    
    onFilterChange(e) {
        console.info(e.target.value);
        this.setState({filterValue: e.target.value.toLowerCase()});
    }

    render() {
        const {assets, connections, tags} = this.props;
        const {filterValue, selected} = this.state;

        // todo: refactor all to selected
        const resourceTypes = selected;
        
        const listItems = resourceTypes === types.CONNECTION ?
            // todo: filter connections
            this.props.typeToItemsMap[resourceTypes]
            : resourceHelpers.filterByName({
                objectList: this.props.typeToItemsMap[resourceTypes] || [],
                filterValue
            });

        return (
            <ResourceBrowserLayout id="resource-browser__layout">
                <l.LayoutRow justify={'center'}>
                    <ResourceBrowser
                        tabItems={tabs}
                        listItems={listItems}
                        selected={selected}
                        onSelect={(selected) =>  this.setState({selected})}
                        onFilterChange={this.onFilterChange}
                        setActiveDetail={this.props.setActiveDetail}
                     />
                    <ResourceDetail/>

                </l.LayoutRow>
            </ResourceBrowserLayout>
        );
    }
}

type BrowserProps = {
    tabItems: Array<{label: string, type: string}>,
    listItems: Array<Asset> | Array<Connection> | Array<Tag>,
    selected: Selected,
    onSelect: (any) => void,
    onFilterChange: (any) => void,
    setActiveDetail: (any) => void,

}

const ResourceBrowser = (props: BrowserProps) => (
    <BrowserContainer>
        <ListTabItems
            items={props.tabItems}
            selected={props.selected}
            onSelect={props.onSelect}
        />

        <FilterInputField
            type="text"
            placeholder="filter..."
            onChange={props.onFilterChange}
        />
        
        <ResourceList 
            onClick={props.setActiveDetail}
            listItems={props.listItems}
            selected={props.selected}
        />

    </BrowserContainer>
);


const tabs = [
    {label: "Asset", type: types.ASSET},
    {label: "Connections", type: types.CONNECTION},
    {label: "Tags", type: types.TAG},
]

const ListTabItems = ({items, selected, onSelect}) => (
    <ListTabs>
        {items.map(item => (
            <ListTab
                onClick={() => onSelect(item.type)}
                selected={selected === item.type}>{item.label}
            </ListTab>
        ))}
    </ListTabs>
);

const DivConnectionListItem = styled.div`
    display: flex;
    margin: 1px 6px;
    letter-spacing: 0.05rem; 
    > div {
        flex-basis: 45%;
    } 
    > div:nth-of-type(2){
        flex-basis: 10%;
    }
`;


export default connect(
    resourceBrowserCtrl.mapStateToProps,
    resourceBrowserCtrl.mapDispatchToProps
)(ResourceBrowserContainer);

