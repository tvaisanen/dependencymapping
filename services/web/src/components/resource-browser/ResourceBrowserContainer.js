//@flow

import {connect} from 'react-redux'
import React, {Component} from 'react';

import { ASSET, CONNECTION, TAG } from '../../constants/types';
import * as resourceHelpers from './../../common/resource-helpers';
import ResourceDetail from '../resource-detail/ResourceDetailContainer';

import type { Asset, Connection, Tag } from '../../store/types';
import resourceBrowserCtrl from './resource-browser.controller';

import { ResourceBrowser, ResourceList } from './components/components';

import {
    ResourceBrowserLayout,
} from './resource-browser.styled.js';


type Props = {
   assets: Array<Asset>,
   connections: Array<Connection>,
   tags: Array<Tag>,
   selected: ASSET | CONNECTION | TAG,
   //  todo: specify the following
   activeDetail: any,
   setActiveDetail: (any) => void
}

type State = {
    filterValue: string,
    selected: ASSET | CONNECTION | TAG
}

class ResourceBrowserContainer extends Component <Props, State> {

    defaultProps = {
        selected: CONNECTION
    }

    state = {
        filterValue: "",
        selected: this.props.selected,
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
        
        const listItems = resourceTypes === CONNECTION ?
            // todo: filter connections
            this.props.typeToItemsMap[resourceTypes]
            : resourceHelpers.filterByName({
                objectList: this.props.typeToItemsMap[resourceTypes] || [],
                filterValue
            });

        return (
            <ResourceBrowserLayout id="resource-browser__layout">
                <ResourceBrowser
                    tabItems={tabs}
                    listItems={listItems}
                    selected={selected}
                    onSelect={(selected) =>  this.setState({selected})}
                    onFilterChange={this.onFilterChange.bind(this)}
                    setActiveDetail={this.props.setActiveDetail}
                 />
                <ResourceDetail/>
            </ResourceBrowserLayout>
        );
    }
}

const tabs = [
    {label: "Assets", type: ASSET},
    {label: "Connections", type: CONNECTION},
    {label: "Tags", type: TAG},
];

export default connect(
    resourceBrowserCtrl.mapStateToProps,
    resourceBrowserCtrl.mapDispatchToProps
)(ResourceBrowserContainer);

