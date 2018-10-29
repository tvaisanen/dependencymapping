import styled from 'styled-components';

export const ResourceControllerLayout = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  color: rgba(255,255,255,0.8);
`;


export const MainBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: center; 
    border: ${p => p.theme.defaultBorder};
    border-radius: ${p => p.theme.borderRadius};
    width: ${p =>
    p.visible ?
        "100%"
        : "0"
    };
    visibility: ${p =>
    p.visible ?
        'visible'
        : 'hidden'

    };
    height: inherit;
    flex-grow: 3;
    padding: 0 12px;  
    transform: ${p =>
    p.visible ?
        "scaleX(1)"
        : "scaleX(0)"};
    transition:
      transform 300ms ease-in-out,
      width 500ms ease-in-out,
      flex-grow 1000ms ease-in-out;
      
    transform-origin: right;
    
`;

export const SecondaryBlock = styled.div`
    height: inherit;
    display: flex;
    flex-direction: ${props => props.column ? 'column' : 'row'};
    background: ${props => props.bg};
    justify-content: center;
    align-items: center;
    align-self: center;
    margin-left: 12px;
    border: ${p => p.theme.defaultBorder};
    border-radius: ${p => p.theme.borderRadius};
    width: ${p =>
    p.visible ?
        "100%"
        : "0"
    };
    visibility: ${p =>
    p.visible ?
        'visible'
        : 'hidden'

    };
    flex-grow: 3;
    padding: 0 12px;  
    border-radius: 3px;
    transform: ${p =>
    p.visible ?
        "scaleX(1)"
        : "scaleX(0)"};
    transition:
      transform 300ms ease-in-out,
      width 500ms ease-in-out,
      flex-grow 1000ms ease-in-out;
      
    transform-origin: right;
    
`;
