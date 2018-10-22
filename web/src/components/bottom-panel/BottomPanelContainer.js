import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ResourceBrowserContainer from '../resource-browser/ResourceBrowserContainer';
import {connect} from 'react-redux'
import * as views from './../../constants/views';
import * as actionCreators from './../../actions/index';
import {bindActionCreators} from 'redux';
import PanelNavTabs from './bottom-panel.components';
import ResourceControllerContainer from '../resource-controller/ResourceControllerContainer';

const panelViews = {
            [views.BROWSE]: {
                header: "detail",
                component: ResourceBrowserContainer,
            },
            [views.CREATE]: {
                header: "forms",
                component: ResourceControllerContainer,
            }
        };

const BottomPanelContainer = (props) => {
    const view = props.views[props.selectedView];
        return (
            <BottomPanel id="bottom-panel-container">
                <PanelNavTabs/>
                <PanelContent id="panel-content">
                    <view.component/>
                </PanelContent>
            </BottomPanel>
        );
};


BottomPanelContainer.propTypes = {
    detail: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps = {}) => {
    return {
        views: panelViews,
        activeDetail: state.activeDetail.data,
        selectedView: state.app.bottomPanel.view,
        cy: state.graph
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({...actionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomPanelContainer);

export const BottomContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: ${props=>props.justify};
    align-items: center;
    height: 40vh;
    flex-grow: 1; 
`;

const BottomPanel = styled.div`
    max-width: 100vw;
    min-width: 800px;
    flex-grow: 1;
    width: 100vw;
    height: 100%;
    max-height: 40vh;
  
    transform: ${props => props.collapsed ? 'scaleY(0)' : 'scaleY(1)'};
    background: ${props => props.collapsed ? 'white' : null};
    color: rgba(255,255,255,0.8);
`;

const PanelContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fafafa;
    background: transparent;
    height: inherit;
    max-height: 33vh;
    padding: 12px;
`;

