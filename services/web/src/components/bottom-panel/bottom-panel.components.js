import React from 'react';
import {connect} from 'react-redux';
import {setBottomPanelView, showBottomPanel, toggleBottomPanel} from '../../store/ui/ui.actions';
import {ArrowIcon, PanelNavigation, PanelNavTab} from './bottom-panel.styled';
import EditorButtons from "../detail-editor/components/EditorButtons";

const PanelNavTabs = ({bottomPanel, setView, toggleBottomPanelVisibility,showBottomPanel}) => (
    <PanelNavigation id="panel-nav-tabs">
        <div>
            {
                bottomPanel.tabItems.map((tab,i) => (
                    <PanelNavTab id="panel-nav-tab"
                        key={i}
                        selected={bottomPanel.view === tab.view}
                        // todo: refactor function
                        onClick={() => {

                            if (bottomPanel.view !== tab.view){
                                setView(tab.view)
                            }

                            if (!bottomPanel.visible){
                                showBottomPanel()
                            }
                        }}
                        largePadding
                    >{tab.label}
                    </PanelNavTab>
                ))
            }
        </div>
        <EditorButtons/>

        <ToggleArrow up={!bottomPanel.visible} toggle={toggleBottomPanelVisibility}/>
    </PanelNavigation>
);


const ToggleArrow = ({up, toggle}) => (
    <ArrowIcon style={{color:'white', cursor:'pointer'}} onClick={toggle}>
        {up ?  <span>&#9653;</span> : <span>&#9663;</span> }
        </ArrowIcon>
);


const mapStateToProps = (state, props) => {
    return {
        bottomPanel: state.app.bottomPanel,
        selectedView: state.app.bottomPanel.view,
        tabItems: state.app.bottomPanel.tabItems,
    }
};

const dispatchToProps = (dispatch) => ({
    setView: (view) => dispatch(setBottomPanelView(view)),
    toggleBottomPanelVisibility: () => dispatch(toggleBottomPanel()),
    showBottomPanel: () => dispatch(showBottomPanel())
})

export default connect(
    mapStateToProps, dispatchToProps
)(PanelNavTabs)
