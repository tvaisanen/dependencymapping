import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import collapseMenuCtrl from './collapse-menu.controller';

const CollapseMenuContainer = props => (
    <CollapseMenu visible={props.visible}>
        {console.info(props)}
    <FloatingButton onClick={props.updateLayout}>refresh</FloatingButton>
    <FloatingButton onClick={props.clearGraphSelection}>clear</FloatingButton>
    <FloatingButton onClick={(() => props.saveMapping(props.activeMapping))}>save</FloatingButton>
    <FloatingButton onClick={props.downloadImage}>download</FloatingButton>
    </CollapseMenu>
)

export default connect(
    collapseMenuCtrl.stateToProps,
    collapseMenuCtrl.dispatchToProps,
)(CollapseMenuContainer);

export const CollapseMenu = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    opacity: ${props=>props.visible?1:0};
    transform: ${props=>props.visible? 'scaleY(1)' : 'scaleY(0)'};
    transform-origin: top center;
    right: 12px;
    background: transparent;
    width: auto;
    min-height: inherit;
    height: auto;
    overflow: hidden;
    overflow-x: hidden;
    transition: all .2s ease-in-out;

`;
export const FloatingButton = styled.button`
    border-radius: 3px;
    border: none;
    padding: 0.25em;
    background: rgba(36,36,42, 0.5);
    margin: .5em;
    cursor: pointer;
    color: white;
    font-weight: bold;
    font-size: smaller;
`;