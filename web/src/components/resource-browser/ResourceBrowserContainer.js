import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import styled from 'styled-components';
import * as l from '../layout';
import * as types from './../../constants/types';
import {isResourceInMapping, filterResources } from './../../common/resource-helpers';
import * as graphHelpers from "./../../common/graph-helpers";
import ResourceDetail from '../resource-detail/ResourceDetailContainer';
import { FilterInputField } from '../common.components';
import resourceBrowserCtrl from './resource-browser.controller';

class ResourceBrowserContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterValue: "",
            resourceTypes: types.ASSET
        };

        this.addResourceToMapping = this.addResourceToMapping.bind(this);
        this.removeResourceFromMapping = this.removeResourceFromMapping.bind(this);
        this.onFilterChange = this.onFilterChange.bind(this);
    }

    addResourceToMapping(resource) {
        this.props.addResourceToActiveMapping(
            resource,
            this.props.activeMapping
        );
    }

    removeResourceFromMapping(resource) {
        this.props.removeResourceFromActiveMapping(resource);
    }

    onFilterChange(e) {
        console.info(e.target.value);
        this.setState({filterValue: e.target.value.toLowerCase()});
    }

    render() {
        const { resources, tags } = this.props;
        const {filterValue, resourceTypes} = this.state;
        const isResourceInMap = isResourceInMapping({
            mapping: this.props.activeMapping ? this.props.activeMapping : {name:'none'},
            resourceId: this.props.activeDetail.name || false,
        });

        const resourceItems = resourceTypes === types.ASSET ?
            filterResources({resources: resources, filterValue})
            : filterResources({resources: tags, filterValue})
         ;

        return (

            <ResourceBrowserLayout>
                <l.LayoutRow justify={'center'}>

                    <ResourceBrowser>
                        <ResourceSwitch>
                            <ResourceListItem
                                onClick={() => this.setState({resourceTypes: types.ASSET})}
                                selected={resourceTypes === types.ASSET}>Assets</ResourceListItem>
                            <ResourceListItem
                                onClick={() => this.setState({resourceTypes: types.TAG})}
                                selected={resourceTypes === types.TAG}>Tags</ResourceListItem>
                        </ResourceSwitch>
                        <FilterInputField
                            type="text"
                            placeholder="filter..."
                            onChange={this.onFilterChange}/>
                        <ResourceList>
                            {
                                resourceItems.map((resource, i) => (
                                        <ResourceListItem
                                            key={i}
                                            selected={resource.name === this.props.activeDetail.name}
                                            onClick={() => this.props.setActiveDetail({
                                                data: resource,
                                                type: resourceTypes
                                            })}
                                        >{resource.name}
                                        </ResourceListItem>
                                    )
                                )
                            }
                        </ResourceList>
                    </ResourceBrowser>

                    <ResourceDetail
                        addToMap={this.addResourceToMapping}
                        removeFromMap={this.removeResourceFromMapping}
                        editDetail={this.props.editDetail}
                        detailType={this.props.activeDetailType}
                        detail={this.props.detail}
                        setDetail={this.props.setActiveDetail}
                        isResourceInMap={isResourceInMap}
                        addResourceToMapping={this.addResourceToMapping}
                        removeResourceFromActiveMapping={this.removeResourceFromMapping}
                    />
                </l.LayoutRow>
            </ResourceBrowserLayout>
        );
    }
}

ResourceBrowserContainer.propTypes = {
    cy: PropTypes.object.isRequired,
    addResourceToActiveMapping: PropTypes.func.isRequired,
    removeResourceFromActiveMapping: PropTypes.func.isRequired,
    setActiveDetail: PropTypes.func.isRequired,
    editDetail: PropTypes.func.isRequired,
    activeMapping: PropTypes.object.isRequired
};



export default connect(
    resourceBrowserCtrl.mapStateToProps,
    resourceBrowserCtrl.mapDispatchToProps
)(ResourceBrowserContainer);

const ResourceSwitch = styled.div`
    display: flex;
    flex-direction: row;
    background: transparent;
    width: inherit;
    
`;





const ResourceBrowserLayout = styled.div`
  width: 100%;
  height: 100%;
  color: rgba(255,255,255,0.8);

`;
const ResourceBrowser = styled.div`
 display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    width:33%;
    min-width: 16em;
    margin-right: 12px;
    border-radius: 3px;

`;

const ResourceList = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    width:33%;
    min-width: 16em;
    overflow-y: scroll;
    overflow-x: hidden;
    margin-right: 12px;
    border-radius: 3px;

`;

const ResourceListItem = styled.div`
    font-size: small;
    text-align: center;
    padding: 2px;
    cursor: pointer;
    margin: 2px 4px;
    width: 100%;
    border-radius: 3px;
    background: ${props => props.selected ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)'};
    :hover{
        background: rgba(255,255,255, 0.35);
    }
`;

