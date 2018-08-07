import styled from 'styled-components';

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
export const SidePanelContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: ${props => 
        props.collapsed ? 
        '0' : 
        'auto'
    };
    transform: ${props => 
        props.collapsed ? 
        'scale(1,0)' : 
        'scale(1,1)'
    };
    visibility:
    transition: all 1s ease-in;
    padding: 4px 0;
    margin: 6px;

`;
export const SidePanelTabButton = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: rgba(36,36,42, 0.8);
    color: white;
    text-align: center;
    font-weight: bold;
    padding: 6px 15px;
    margin: 4px;
    border-radius: 3px;
`;

export const SidePanelMenu = styled.div`
    resize: vertical;
    `;