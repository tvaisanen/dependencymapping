import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import topBarController from './top-bar.controller';
import * as sc from './top-bar.styled';
import CollapseMenuContainer from '../collapse-menu/CollapseMenuContainer';

/**
 * Sub components for the top bar
 */

const renderOptions = options => {
    return options.map((option, i) => (
        <option key={i}>{option}</option>
    ))
};

const LayoutSelection = ({layoutOptions, selectedLayout, setGraphLayout}) => (
    <select value={selectedLayout} onChange={(e) => setGraphLayout(e.target.value)}>
        {renderOptions(layoutOptions)}
    </select>
);

const RefreshButton = ({onClick}) => <sc.RefreshBtn onClick={onClick}>&#8635;</sc.RefreshBtn>;
const MenuToggleButton = ({onClick}) => <sc.MenuToggle onClick={onClick}>&#9776;</sc.MenuToggle>;
const InfoBlock = ({message}) => <sc.InfoSpan>{message}</sc.InfoSpan>;

// top bar main component
const TopBarContainer = (props) => (
    <sc.TopBar>
        <sc.Title>Dependency Mapper</sc.Title>
        <InfoBlock message={props.infoMessage}/>
        <sc.BarBlock>
            <RefreshButton onClick={props.refreshLayout}/>
            <LayoutSelection
                layoutOptions={props.layoutOptions}
                selectedLayout={props.selectedLayout}
                setGraphLayout={props.setGraphLayout}
            />
            <MenuToggleButton onClick={props.toggleCollapseMenu}/>
        </sc.BarBlock>
        <CollapseMenuContainer/>
    </sc.TopBar>
);

TopBarContainer.propTypes = {
    info: PropTypes.string,
    layoutOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
    refreshLayout: PropTypes.func.isRequired,
    selectedLayout: PropTypes.string.isRequired,
    setGraphLayout: PropTypes.func.isRequired,
};

export default connect(
    topBarController.mapStateToProps,
    topBarController.dispatchToProps
)(TopBarContainer);


