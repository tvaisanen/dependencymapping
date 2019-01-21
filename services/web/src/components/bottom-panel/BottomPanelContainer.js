import React, {Suspense, Lazy} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ResourceBrowserContainer from '../resource-browser/ResourceBrowserContainer';
import {connect} from 'react-redux'
import * as views from './../../constants/views';
import PanelNavTabs from './bottom-panel.components';
//import DetailEditor from '../detail-editor/DetailEditor';

const DetailEditor = React.lazy(() => import('../detail-editor/DetailEditor'))

const panelViews = {
    [views.BROWSE]: {
        header: "detail",
        component: ResourceBrowserContainer,
    },
    [views.CREATE]: {
        header: "forms",
        //component: ResourceControllerContainer,
        component: DetailEditor
    },
};

const BottomPanelContainer = (props) => {
    const {SelectedViewComponent} = props;
    return (
        <BottomPanel id="bottom-panel-container">
            <PanelNavTabs/>
            <PanelContent id="panel-content">
                    <Suspense fallback={<div>Loading...</div>}>

                        <SelectedViewComponent id="active-panel-view"/>
      </Suspense>
            </PanelContent>
        </BottomPanel>
    );
};


BottomPanelContainer.propTypes = {
    detail: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => (
    {SelectedViewComponent: panelViews[state.app.bottomPanel.view].component}
);


export default connect(
    mapStateToProps,
    {}
)(BottomPanelContainer);


const BottomPanel = styled.div`
    max-width: 100vw;
    min-width: 800px;
    flex-grow: 1;
    width: 100vw;
    height: 100%;
    max-height: 40vh;
  
    background-color: ${p => p.theme.colorDarkBackground};
    transform: ${props => props.collapsed ? 'scaleY(0)' : 'scaleY(1)'};
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

