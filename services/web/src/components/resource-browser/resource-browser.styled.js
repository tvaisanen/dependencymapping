import styled from 'styled-components';

export const DivConnectionListItem = styled.div`
    display: flex;
    margin: 1px 6px;
    letter-spacing: 0.05rem; 
    > div {
        flex-basis: 45%;
    } 
    > div:nth-of-type(2){
        flex-basis: 10%;
    }
`;


export const ResourceBrowserLayout = styled.div`
    display: flex;

  width: 100%;
  height: 100%;
  color: rgba(255,255,255,0.8);
`;

export const BrowserContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    flex-grow: 1;
    width: 16em;
    max-width: 16em;
    min-width: 16em;
    margin-right: 12px;
    border-radius: 3px;
    border: 1px solid grey;
`;


export const ListItemBox = styled.div`

    font-size: small; 
    letter-spacing: 0.05em;
    text-align: center;
    cursor: pointer;
    margin: 1px 6px;
    border-radius: 3px;

    background: ${props => props.selected ? 
        'rgba(255,255,255,0.3)' 
        : 'rgba(255,255,255,0.1)'
    };

    :hover {
        background: rgba(255,255,255, 0.35);
    }

`;

export const ListTabs = styled.div`

    display: flex;
    flex-direction: row;
    background: transparent;
    width: 100%;
    min-height: 1.2em;
  
`;

export const ListTab = styled.div`

    font-size: small;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    text-align: center;
    justify-content: center;
    padding: 2px 2px 4px 2px;
    cursor: pointer;
    width: 100%;
    grow: 1;
    border-radius: 3px;

    background: ${props => props.selected ? 
        'rgba(255,255,255,0.3)' 
        : 'rgba(255,255,255,0.1)'
    };

    :hover{
        background: rgba(255,255,255, 0.35);
    }
    
    :first-of-type {
      border-radius: 3px 0 0 0;
    }

    :last-of-type {
      border-radius: 0 3px 0 0;
    }
`;


export const ListContainer = styled.div`
    display: flex;
    flex-direction:column;
    align-items: stretch;
    width: inherit; 
    overflow-y: auto;
`;