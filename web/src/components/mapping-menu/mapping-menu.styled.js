import styled from 'styled-components';

export const ListItem = styled.div`
    font-size: small;
    text-align: center;
    letter-spacing: 0.05em;
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
export const ScrollContent = styled.div`
    display: flex;
    flex-direction: column;
    height: auto; 
    padding: 4px 0;
    margin: 0 6px;
    overflow-y: auto;
    overflow-x: hidden;
    flex-grow: 1;
`;
export const PanelHeader = styled.div`
    display: flex;
    justify-content: center;
    //background: rgba(36,36,42, 0.8);
    color: white;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    padding: 6px 15px;
    margin: 4px;
    border-radius: 3px;
`;

export const SidePanelMenu = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;