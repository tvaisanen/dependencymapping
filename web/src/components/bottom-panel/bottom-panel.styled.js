import styled from 'styled-components';


export const PanelNavigation = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 4px 4px 0 24px;
    background: rgba(100, 100, 105, 0.3);
    border-bottom: solid 1px rgba(255,255,255,.8);
    margin-bottom: 4px;
`;


export const PanelNavTab = styled.span`
    font-size: small;
    font-weight: bold;
    color: ${props => props.selected ? 'rgba(255,255,255,.9)' : 'rgba(255,255,255,0.5)'};
    background: ${props => props.selected ? 'rgba(255,255,255,.3)' : 'rgba(255,255,255,0.25)'};
    padding: ${props => props.largePadding ? '0 16px' : '0 4px'};
    border-radius: 3px 3px 0px 0px;
    margin: 2px;
    cursor: pointer;
    box-shadow: ${props => props.selected ? '0px -1px 2px rgba(255,255,255,.7)' : null};
`;
