import React from 'react';
import PropTypes from 'prop-types';
import * as s from './layout-segment.styled';
import {Menu} from "../../containers/SideTabMenuContainer";
import { connect } from 'react-redux';

export const TopBar = ({menuToggleHandler, info}) => (
    <s.TopBar>
        <span>Dependency Mapper</span>
        <span style={{fontSize: 'small'}}>{info}</span>

        <s.MenuToggle onClick={menuToggleHandler}>
            &#9776;
        </s.MenuToggle>
    </s.TopBar>
)

const Panels = (props) => (
    <React.Fragment>
        panelInstructions.map((data,i) => (
            <s.SidePanel>
                <Menu props />
            </s.SidePanel>
        )
    </React.Fragment>
);

Panels.propTypes = {
    cy: PropTypes.object.isRequired,
};

export const PanelLists = connect(null,{})(Panels);

