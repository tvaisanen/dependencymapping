import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/graphActions';
import styled from 'styled-components';
import * as l from '../components/layout';
import { isResourceInMapping } from '../common/resource-helpers';

import ResourceDetailContainer from './ResourceDetailContainer';
class ResourceBrowserContainer extends Component {
    render() {
        const { resources } = this.props;
        console.log(this.props);
        const isResourceInMap = isResourceInMapping({
            mapping: this.props.activeMapping,
            resourceId: this.props.detail.name
        })
        return (
            <l.BottomPanelContent id="resource-browser-container">
    
                <l.LayoutRow justify={'center'}>
                <ResourceList>
                    {
                        resources.map(r=> (
                            <ResourceListItem
                                selected={r.name === this.props.detail.name}
                                onClick={() => this.props.setDetail(r.name)}
                                >{r.name}
                           </ResourceListItem>
                        )
                    )}
                </ResourceList>
                <ResourceDetailContainer 
                    detail={this.props.detail}
                    setDetail={this.props.setDetail}
                    isResourceInMap={isResourceInMap}
                    addResourceToActiveMapping={this.props.addResourceToActiveMapping}
                />
                </l.LayoutRow>
            </l.BottomPanelContent>
        );
    }
}

ResourceBrowserContainer.propTypes = {

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

const ResourceList = styled.div`
    height: 100%;
    width:auto;
    min-width: 16em;
    overflow-y: scroll;
    
    margin-right: 12px;

`;

const ResourceListItem = styled.div`
    margin-bottom: 2px;
    padding: 4px;
    cursor: pointer;
    border-bottom: 2px solid white;
    border: 2px solid ${props=>props.selected?'gray': 'transparent'};
    border-left: 2px solid #4d4c4c;
    background: ${props=>props.selected?'rgba(40,40,40,0.2)':null};
    :hover{
        background: rgba(0,0,255, 0.2);
    }
`;

const Header = styled.h2`
    margin: 4px 0;
`
;