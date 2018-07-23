import React from 'react';

import {
    SidePanelMenu,
    SidePanelTabButton,
    SidePanelContentContainer
} from '../components/';
import styled from 'styled-components';

export const Menu = (
    {title, listItems, onItemClick, onMouseOver, onMouseOut, darkButtons, selected}) => (
    <SidePanelMenu>

        <SidePanelTabButton>
            <PanelHeaderTitle>
                {title}
            </PanelHeaderTitle>
        </SidePanelTabButton>
        <SidePanelContentContainer>
            {listItems ?
                listItems.map((item, i) => (
                    <ListItem
                        selected={selected === item}
                        darkButtons={darkButtons}
                        key={i}
                        onClick={() => onItemClick(item)}
                        onMouseOver={onMouseOver ? () => onMouseOver(item) : null}
                        onMouseOut={onMouseOut ? () => onMouseOut(item) : null}
                    >
                        {item}
                    </ListItem>)
                )
                : null}

        </SidePanelContentContainer>
    </SidePanelMenu>
);

export const PanelHeaderTitle = styled.div`
    
    text-center: center;
    text-transform: capitalize;
    border-bottom: solid 2px transparent;

`;

export const ListItem = styled.div`
    font-size: small;
    text-align: center;
    padding: 2px;
    cursor: pointer;
    margin: 2px 0;
    width: 100%;
    border-radius: 3px;
    font-weight: ${
        props => props.selected ? 
            'bold':'auto'
    };
    border-top: ${
        props => props.darkButtons ? 
            'auto':'2px solid rgba(54, 48, 54)'
    };
    border-bottom: ${
        props => props.darkButtons ? 
            'auto':'2px solid rgba(54,48,54)'
    };
    background: ${
        props => props.darkButtons ?  
            'rgba(255,255,255,0.1)': '#F5F5F5'};
  
    color: ${
        props => props.darkButtons ?  
            'rgba(255,255,255,0.9)': 'auto'};
        :hover{
        background: rgba(255,255,255, 0.35);
    }
    transition: all .15s ease-in-out;   
`;

