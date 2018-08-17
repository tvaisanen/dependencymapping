import React from 'react';
import styled from 'styled-components';
import { colorDark } from "../../constants/colors";

const TopBarContainer = ({menuToggleHandler, info}) => (
    <TopBar>
        <span>Dependency Mapper</span>
        <span style={{fontSize: 'small'}}>{info}</span>

        <MenuToggle onClick={menuToggleHandler}>
            &#9776;
        </MenuToggle>
    </TopBar>
)

export default TopBarContainer;


const TopBar = styled.div`
    background: ${colorDark};
    display: flex;
    flex-direction: row;
   
    color: #FAFAFA;
    font-size: larger;
    font-weight: bold;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
`;

const MenuToggle = styled.div`
    padding: 3px;
    margin-bottom: 2px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    border: 1px solid transparent;
    border-radius: 3px;
    :hover {
      border-color: white;
    }    
    transition: all .3s ease-in-out;
`;

