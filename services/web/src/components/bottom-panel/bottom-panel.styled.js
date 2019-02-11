import styled from 'styled-components';


export const PanelNavigation = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 4px 4px 0 24px;
    background-color: rgba(22,22,22,0.3);
    
    //border-bottom: solid 1px rgba(255,255,255,.8);
    margin-bottom: 4px;
`;


export const PanelNavTab = styled.span`
    font-size: small;
    letter-spacing: ${p=>p.theme.headerLetterSpace};
    color: ${
        p => p.selected ? 
            'whitesmoke' 
            : 'rgba(255,255,255,0.5)'
    };
    background: ${
        p => p.selected ? 
            p.theme.colorDarkBackground
            : p.theme.colorLight 
    };
    padding: ${props => props.largePadding ? '0 16px' : '0 4px'};
    border-radius: 3px 3px 0px 0px;
    border: 1px solid silver;
    border-bottom: none;
    margin: 2px;
    cursor: ${
        p => p.selected ? 
            "default"
            : "pointer"
    };
    
    transition: all .3s ease-in-out;
`;
