import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions/index';
import styled from 'styled-components';
import * as l from '../components/layout';
import * as types from '../constants/types';
import {isResourceInMapping, resourceExists} from '../common/resource-helpers';
import {
    addElement, nodeElementFromResource, edgeElementFromResource,
    removeElement, updateLayout
} from "../common/graph-helpers";
import * as _ from 'lodash';
import ResourceDetail from './ResourceDetail';

class ResourceBrowserContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterValue: "",
            resourceTypes: types.ASSET
        };

        this.addResourceToMapping = this.addResourceToMapping.bind(this);
        this.removeResourceFromMapping = this.removeResourceFromMapping.bind(this);
        this.filterResources = this.filterResources.bind(this);
        this.onFilterChange = this.onFilterChange.bind(this);
    }

    addResourceToMapping(resource) {
        /*
         * Create node element from the resource and
         * get the edge elements to represent the connections
         * between source and source.connected_to resources
         *
         */
        const node = nodeElementFromResource(resource);
        const edgeElements = resource.connected_to.map(r => edgeElementFromResource(resource.name, r.name));

        /*
         * Get resources from active mapping that are connected
         * to the resource, which is added to the active mapping.
         * For creating edges in the graph.
         */
        const resourcesConnectingInto = this.props.activeMapping
                .resources.map(r => {
                    const booleans = r.connected_to.map(res => (resource.name == res.name));
                    if (_.findIndex(booleans, true)){
                        return r;
                    }
            })
        ;

        const edgesTargetingResource = resourcesConnectingInto.map(r => edgeElementFromResource(r.name, resource.name));

        console.info(edgesTargetingResource);

        this.props.addResourceToActiveMapping(resource);
        console.info(this.props.cyRef);
        console.info(node);
        addElement(this.props.cyRef, node);
        addElement(this.props.cyRef, edgeElements);
        addElement(this.props.cyRef, edgesTargetingResource);
        updateLayout(this.props.cyRef);
    }

    removeResourceFromMapping(resource) {
        this.props.removeResourceFromActiveMapping(resource);
        removeElement(this.props.cyRef, resource.name);
    }

    filterResources({resources, filterValue}) {
        return resources.filter(r => r.name.toLowerCase().includes(filterValue));
    }

    onFilterChange(e) {
        console.info(e.target.value);
        this.setState({filterValue: e.target.value.toLowerCase()});
    }

    render() {
        const { activeDetail, activeMapping, resources, tags } = this.props;
        const {filterValue, resourceTypes} = this.state;
        const isResourceInMap = isResourceInMapping({
            mapping: this.props.activeMapping,
            resourceId: this.props.activeDetail.name
        });


        console.group("Filter debug");
        console.info(resources);
        console.info(tags);
        console.groupEnd()

        const resourceItems = resourceTypes === types.ASSET ?
            this.filterResources({resources: resources, filterValue})
            : this.filterResources({resources: tags, filterValue})
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
                        <FilterInput
                            type="text"
                            placeholder="filter..."
                            onChange={this.onFilterChange}/>
                        <ResourceList>
                            {
                                resourceItems.map((resource, i) => (
                                        <ResourceListItem
                                            key={i}
                                            selected={resource.name === this.props.detail.name}
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
                        setResourceDetail={this.props.setResourceDetail}
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
    cyRef: PropTypes.object.isRequired,
    addResourceToActiveMapping: PropTypes.func.isRequired,
    removeResourceFromActiveMapping: PropTypes.func.isRequired,
    setActiveDetail: PropTypes.func.isRequired,
    editDetail: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    activeMapping: PropTypes.array.isRequired
};

const mapStateToProps = (state, ownProps = {}) => {
    return {
        resources: state.resources,
        tags: state.tags,
        activeMapping: state.activeMapping,
        activeDetail: state.activeDetail.data,
        activeDetailType: state.activeDetail.type
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({...actionCreators}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ResourceBrowserContainer);

const ResourceSwitch = styled.div`
    display: flex;
    flex-direction: row;
    background: transparent;
    width: inherit;
    
`;


const FilterInput = styled.input`
  background-color: transparent;
  text-align: center;
  max-width: 200px;
  width: 80%;
  border: none; 
  border-bottom: 1px solid grey; 
  margin: 0 8px 8px 0;
  color: rgba(255,255,255,0.6);

  :focus::placeholder{
    color: transparent;
  }
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

