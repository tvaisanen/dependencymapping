import styled from 'styled-components';

export const BrowserGrid = styled.div`
  display: grid;
  grid-template:
  "resource-browser resource-detail" 1fr
  / 16em 1fr;
  grid-gap: 4px;
  height: 100%;
  width: 100%;
  border-radius: 3px;
  > div {
    max-height: 100%;
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
    border-right: 1px solid rgba(25,25,25,0.1);
`;


export const ListItemBox = styled.div`

    display: flex;
    justify-content: center;
    align-items: center;
    font-size: small; 
    letter-spacing: 0.07em;
    text-align: center;
    cursor: pointer;
    margin: 1px 6px;
    border-radius: 3px;
    padding: 2px; 

    background: ${p => p.selected ? 
        p.theme.listItemSelectedDarkBackground
        : p.theme.listItemDarkBackground
    };

    :hover {
    
        background: rgba(255,255,255, 0.1);
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

    font-size: x-small;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    text-align: center;
    justify-content: center;
    padding: 2px 2px 4px 2px;
    cursor: ${p=>p.selected? "default":"pointer"};
    width: 100%;
    grow: 1;
    
    background-color: ${p => p.theme.cardHeaderBackgroundColor};
    border-bottom: 1px solid ${p=>p.selected?"whitesmoke":"transparent"};

    :hover{
        background: rgba(255,255,255,0.1);
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