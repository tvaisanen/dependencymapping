import React from 'react';

import TopBarContainer from '../top-bar/LazyTopBar';
import BottomPanelContainer from '../bottom-panel/BottomPanelContainer';
//import MappingMenuContainer from '../mapping-menu/MappingMenuContainer';
import MappingMenuContainer from '../mapping-menu/LazyMappingMenu';
import CollapseMenuContainer from '../collapse-menu/CollapseMenuContainer';

import {
    AppGrid,
    MiddleSection,
    GraphCanvasInflater,
    GraphCanvasContainer
} from './app.styled';

import ActionNotifier from '../action-notifier/ActionNotifier';


const App = () => (
    <AppGrid id="app-container">
        <TopBarContainer id="top-bar-container"/>
        <MappingListWithGraph/>
        <BottomPanelContainer id="bottom-panel-container"/>
    </AppGrid>
);

export default App;


const MappingListWithGraph = () => (
    <MiddleSection>
        <MappingMenuContainer id="mapping-menu-container"/>
        <GraphCanvasInflater id="graph-canvas-wrapper">
            <ActionNotifier id="action-notifier"/>
            <GraphCanvasContainer id="cy"/>
        </GraphCanvasInflater>
    </MiddleSection>
)

