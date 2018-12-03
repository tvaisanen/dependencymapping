import React from 'react';

import TopBarContainer from '../top-bar/TopBarContainer';
import BottomPanelContainer from '../bottom-panel/BottomPanelContainer';
import MappingMenuContainer from '../mapping-menu/MappingMenuContainer';
import CollapseMenuContainer from '../collapse-menu/CollapseMenuContainer';
import GroupTogglePanel from '../group-toggle-panel/';
import DetailEditor from '../detail-editor/DetailEditor';

import {
    AppContainer,
    TopContent,
    MappingContent,
    GraphCanvasInflater,
    GraphCanvasContainer
} from './app.styled';


const App = () => (
    <AppContainer id="app-container">
        <TopContent id="container-top">
            <TopBarContainer id="top-bar-container"/>
            <MappingContent id="mapping-content-container">
                <MappingMenuContainer id="mapping-menu-container"/>
                <GraphCanvasInflater id="graph-canvas-wrapper">
                    <GraphCanvasContainer id="cy"/>
                    <GroupTogglePanel id="tag-toggle-panel-container"/>
                </GraphCanvasInflater>
                <CollapseMenuContainer/>
            </MappingContent>
        </TopContent>
        <BottomPanelContainer id="bottom-panel-container"/>
    </AppContainer>
);

export default App;




