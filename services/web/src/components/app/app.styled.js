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

export const GraphCanvasContainer = styled.div` 
    position: relative;
    width: inherit;
    height: inherit;
    min-height: 360px;
    min-width: 400px;
    background: ${p=>p.theme.colorGraphBackground}; 
    & > * > * { height: inherit; }
    & > div > canvas { 
      height: inherit; 
    }
`;

export const GraphCanvasInflater = styled.div`
    width: 100%;
    height: 100%;
    min-height: 360px;
    background-color: transparent;
    overflow: hidden;
`;
