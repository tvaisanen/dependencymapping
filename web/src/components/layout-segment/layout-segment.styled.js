import styled from 'styled-components';
import { colorDark, mediumDark } from "../../constants/colors";

export const TopBar = styled.div`
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

export const MenuToggle = styled.div`
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

export const SidePanel = styled.div`
    background: rgba(200,200,200,0.8);
    background: ${mediumDark};
    display: flex;
    flex-direction: column;
    width: 320px;
    min-height: inherit;
    min-width: 20vw;
    max-width: ${props=>props.max};
    height: auto;
    overflow: ${props => props.buttons ? 
        'hidden' : 'scroll'
    };
    overflow-x: hidden;
`;

