import React from 'react';
import {connect} from 'react-redux';
import { setBottomPanelView } from '../../actions/app.actions';
import * as s from './bottom-panel.styled';
import EditorButtons from "../detail-editor/components/EditorButtons";
                    //selectedView={props.selectedView}
                    //setView={this.setView}
                    //tabItems={tabItems}
const PanelNavTabs = ({selectedView, tabItems, setView}) => (
    <s.PanelNavigation id="panel-nav-tabs">
        <div>
            {
                tabItems.map((tab,i) => (
                    <s.PanelNavTab id="panel-nav-tab"
                        key={i}
                        selected={selectedView === tab.view}
                        onClick={() => setView(tab.view)}
                        largePadding
                    >{tab.label}
                    </s.PanelNavTab>
                ))
            }
        </div>
        <EditorButtons/>
    </s.PanelNavigation>
);


const mapStateToProps = (state, props) => {
    return {
        selectedView: state.app.bottomPanel.view,
        tabItems: state.app.bottomPanel.tabItems,
    }
};

const dispatchToProps = (dispatch) => ({
    setView: (view) => dispatch(setBottomPanelView(view))
})

export default connect(
    mapStateToProps, dispatchToProps
)(PanelNavTabs)
