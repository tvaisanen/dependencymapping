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

/**
 *  Application root.
 *  Layout and main containers.
 */

const App = ({bottomPanelVisible}) => (
    <AppGrid id="app-container" bottomPanelVisible={bottomPanelVisible}>
        <TopBarContainer id="top-bar-container"/>
        <MappingListWithGraph/>
        <BottomPanelContainer id="bottom-panel-container"/>
    </AppGrid>
);

function mapStateToProps(state) {
    return {
       bottomPanelVisible: state.app.bottomPanel.visible,
    }
}

export default connect(
    mapStateToProps,
    null
)(App);


/**
 *  MappingListWithGraph has two columns containing
 *  the list of mappings and the list of assets in the
 *  active mapping. Graphcanvas inflater has the action-
 *  notifier popup, which is used for indicating active
 *  graph canvas action.
 */

const MappingListWithGraph = () => (
    <MiddleSection>
        <MappingMenuContainer id="mapping-menu-container"/>
        <GraphCanvasInflater id="graph-canvas-wrapper">
            <ActionNotifier id="action-notifier"/>
            <GraphCanvasContainer id="cy"/>
        </GraphCanvasInflater>
    </MiddleSection>
);

