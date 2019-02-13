import React from 'react';
import { connect } from 'react-redux';
import TopBarContainer from '../top-bar/LazyTopBar';
//import MappingMenuContainer from '../mapping-menu/LazyMappingMenu';
import BottomPanelContainer from '../bottom-panel/BottomPanelContainer';
import MappingMenuContainer from '../mapping-menu/MappingMenuContainer';


import {
    AppGrid,
    MiddleSection,
    GraphCanvasInflater,
    GraphCanvasContainer
} from './app.styled';

import ActionNotifier from '../action-notifier/ActionNotifier';


const App = (props) => (
    <AppGrid id="app-container"
             bottomPanelVisible={props.bottomPanel.visible}
    >
        <TopBarContainer id="top-bar-container"/>
        <MappingListWithGraph/>
        <BottomPanelContainer id="bottom-panel-container"/>
    </AppGrid>
);

function mapStateToProps(state) {
    return {
       sidePanel: state.app.sidePanel,
       bottomPanel: state.app.bottomPanel,
    }
}

export default connect(
    mapStateToProps,
    null
)(App);


const MappingListWithGraph = () => (
    <MiddleSection>
        <MappingMenuContainer id="mapping-menu-container"/>
        <GraphCanvasInflater id="graph-canvas-wrapper">
            <ActionNotifier id="action-notifier"/>
            <GraphCanvasContainer id="cy"/>
        </GraphCanvasInflater>
    </MiddleSection>
);

