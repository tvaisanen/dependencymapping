import styled from 'styled-components';


export const PanelNavigation = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 4px 4px 0 24px;
    background: ;
    border-bottom: solid 1px rgba(255,255,255,.8);
    margin-bottom: 4px;
`;


export const PanelNavTab = styled.span`
    font-size: small;
    font-weight: bold;
    letter-spacing: ${p=>p.theme.headerLetterSpace};
    color: ${
        p => p.selected ? 
            'rgba(0,0,0,0.8)' 
            : 'rgba(255,255,255,0.5)'
    };
    background: ${
        p => p.selected ? 
            p.theme.colorLightHighlighted
            : p.theme.colorLight 
    };
    padding: ${props => props.largePadding ? '0 16px' : '0 4px'};
    border-radius: 3px 3px 0px 0px;
    border: 1px solid silver;
    margin: 2px;
    cursor: pointer;
`;
