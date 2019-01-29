import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import collapseMenuCtrl from './collapse-menu.controller';
import {colorDark} from "../../constants/colors";
import PropTypes from 'prop-types';

//<MenuBtn onClick={props.logout}>logout</MenuBtn>

const CollapseMenuContainer = props => (
    <CollapseMenu visible={props.visible}>
        <MenuBtn onClick={props.clearGraphSelection}>clear</MenuBtn>
        <MenuBtn onClick={props.saveMapping}>save</MenuBtn>
        <MenuBtn onClick={props.downloadImage}>download</MenuBtn>
    </CollapseMenu>
);

CollapseMenuContainer.propTypes = {
    clearGraphSelection: PropTypes.func.isRequired,
    downloadImage: PropTypes.func.isRequired,
    saveMapping: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
};

export default connect(
    collapseMenuCtrl.stateToProps,
    collapseMenuCtrl.dispatchToProps,
)(CollapseMenuContainer);

export const CollapseMenu = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    opacity: ${props => props.visible ? 1 : 0};
    transform: ${props => props.visible ? 'scaleY(1)' : 'scaleY(0)'};
    transform-origin: top center;
    padding: 0 24px;
    right: 28px;
    background: ${colorDark};
    width: 80px;
    min-height: inherit;
    height: auto;
    overflow: hidden;
    overflow-x: hidden;
    transition: all .2s ease-in-out;

  border-radius: 0 0 3px 3px;
`;
export const MenuBtn = styled.div`
  padding: 4px 0;
  text-align: center;
  text-justify: distribute-center-last;
  color: rgba(255,255,255,0.8);
  :hover {
    font-weight: bold;
  }
  cursor: pointer;
  
`;