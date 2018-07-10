import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions/graphActions';
import styled from 'styled-components';
import * as l from '../components/layout';
import {isResourceInMapping} from '../common/resource-helpers';
import {
    addElement, nodeElementFromResource,
    removeElement, updateLayout
} from "../common/graph-helpers";

import ResourceDetail from './ResourceDetail';

class ResourceBrowserContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterValue: ""
        };

        this.addResourceToMapping = this.addResourceToMapping.bind(this);
        this.removeResourceFromMapping = this.removeResourceFromMapping.bind(this);
        this.filterResources = this.filterResources.bind(this);
        this.onFilterChange = this.onFilterChange.bind(this);
    }

    addResourceToMapping(resource) {
        this.props.addResourceToActiveMapping(resource);
        const node = nodeElementFromResource(resource);
        addElement(this.props.cyRef, node);
        updateLayout(this.props.cyRef);
    }

    removeResourceFromMapping(resource) {
        this.props.removeResourceFromActiveMapping(resource);
        removeElement(this.props.cyRef, resource.name);
    }

    filterResources({resources, filterValue}) {
        console.info("filtering with: " + filterValue);
        const filtered = resources.filter(r => r.name.toLowerCase().includes(filterValue));
        console.info(filtered);
        return filtered;
    }

    onFilterChange(e) {
        console.info(e.target.value);
        this.setState({filterValue: e.target.value.toLowerCase()});
    }

    render() {
        const {resources} = this.props;
        const {filterValue} = this.state;
        const isResourceInMap = isResourceInMapping({
            mapping: this.props.activeMapping,
            resourceId: this.props.detail.name
        })

        const resourceItems = this.filterResources({resources, filterValue});

        return (

            <ResourceBrowserLayout>
                <l.LayoutRow justify={'center'}>

                        <ResourceBrowser>

                            <input type="text" onChange={this.onFilterChange}/>
                            <ResourceList>
                            {
                                resourceItems.map(r => (
                                        <ResourceListItem
                                            selected={r.name === this.props.detail.name}
                                            onClick={() => this.props.setDetail(r.name)}
                                        >{r.name}
                                        </ResourceListItem>
                                    )
                                )
                            }</ResourceList>
                        </ResourceBrowser>

                    <ResourceDetail
                        detailType={this.props.type}
                        detail={this.props.detail}
                        setDetail={this.props.setDetail}
                        isResourceInMap={isResourceInMap}
                        addResourceToActiveMapping={this.addResourceToMapping}
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
    removeResourceFromActiveMapping: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps = {}) => {
    return {
        resources: state.resources,
        activeMapping: state.activeMapping
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({...actionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ResourceBrowserContainer);

const ResourceBrowserLayout = styled.div`
  width: 100%;
  height: 100%;

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
    margin-right: 12px;
    border-radius: 3px;

`;

const ResourceListItem = styled.div`
    text-align: center;
    margin-bottom: 2px;
    padding: 4px;
    cursor: pointer;
    border-bottom: 2px solid white;
    border: 2px solid ${props => props.selected ? 'gray' : 'transparent'};
    border-right: 2px solid #4d4c4c;
    width: 100%;
    background: ${props => props.selected ? 'rgba(40,40,40,0.2)' : null};
    :hover{
        background: rgba(255,255,255, 0.5);
    }
`;

const Header = styled.h2`
    margin: 4px 0;
`
;