import styled from 'styled-components';

export const TopContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: ${props=>props.align};
    height: 60vh;
    min-height: 360px;
`;

export const MappingContent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: ${props => props.justify};
    align-items: ${props => props.align};
    height: ${props => props.height ? props.height : 'inherit'};
    overflow: hidden;
`;