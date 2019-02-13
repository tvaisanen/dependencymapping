import styled from 'styled-components';

export const AppGrid = styled.div`
  display: grid;
  grid-template:
  "top-bar"        min-content
  "middle-section" ${p => p.bottomPanelVisible ? '60vh' : '1fr'}
  "bottom-panel"   ${p => p.bottomPanelVisible ? '1fr' : 'min-content'} 
  / 1fr;
  min-height: 600px;
  min-width: 800px;
  width: 100vw;
  height: 100vh;
  max-width: 100vw;
  overflow: hidden;
`;

export const MiddleSection = styled.div`
  display: grid;
  grid-template:
  "lists graph" 1fr
  / min-content 1fr;
`;


export const GraphCanvasContainer = styled.div` 
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 360px;
    min-width: 400px;
    background: ${p=>p.theme.colorGraphBackground}; 
    & > * > * { height: inherit; }
    & > div > canvas { 
      height: inherit; 
    }
`;

export const GraphCanvasInflater = styled.div`
    grid-area: graph;
    width: auto;
    height: auto;
    background-color: transparent;
    overflow: hidden;
`;
