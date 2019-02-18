import React, {Suspense} from 'react';
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

            { props.bottomPanel.visible ?

            <PanelContent id="panel-content">
                <Suspense fallback={<div>Loading...</div>}>
                    <SelectedViewComponent id="active-panel-view"/>
                </Suspense>
            </PanelContent>
                :null}
        </BottomPanel>
    );
};


const mapStateToProps = (state) => ({
        SelectedViewComponent: panelViews[state.app.bottomPanel.view].component,
        bottomPanel: state.app.bottomPanel
    });


export default connect(
    mapStateToProps,
    {}
)(BottomPanelContainer);


const BottomPanel = styled.div`
    display:grid;
    grid-area: bottom-panel;
    grid-template:
    "panel-nav" min-content
    "panel-content" minmax(0, 1fr)
    /1fr;
    max-width: 100vw;
    min-width: 800px;
    padding-top: 4px;
    flex-grow: 1;
    width: 100vw;
    height: 100%;
    max-height: 40vh;
    overflow: hidden;
`;

const PanelContent = styled.div`
    grid-area: panel-content;
    color: #fafafa;
    margin: 0 12px 12px 12px;
    height: 100%;
    overflow:hidden;
`;

