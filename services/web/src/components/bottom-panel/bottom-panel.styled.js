import styled from 'styled-components';


export const ArrowIcon = styled.div`
  border: 1px inset lightgrey;
  box-sizing: padding-box;
  padding: 0 6px;
  border-radius: 5px;
  :hover {
    background-color: rgba(255,255,255,0.2);
  }
  transition: background-color .3s ease-in-out;
`;

export const PanelNavigation = styled.div`
    display: flex;
    justify-content: space-between;
    border-top: 1px inset grey;
    border-bottom: 1px inset grey;
    padding: 4px 24px;
    margin-bottom: 6px;
    //background-color: rgba(22,22,22,0.3);
`;


export const PanelNavTab = styled.span`
    font-size: x-small;
    color: ${
        p => p.selected ? 
            'whitesmoke' 
            : 'rgba(255,255,255,0.5)'
    };
    background-color: ${
        p => p.selected ? 
            'rgba(255,255,255,0.1)' 
            : 'auto'
    };
    
    letter-spacing: 0.07rem; 
    
    padding: 2px 4px;
    border-radius: 3px;
    margin: 2px;
    cursor: ${
        p => p.selected ? 
            "default"
            : "pointer"
    };
    
    transition: all .3s ease-in-out;
`;
