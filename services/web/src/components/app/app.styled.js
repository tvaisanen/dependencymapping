import styled from 'styled-components';

export const AppGrid = styled.div`
  // Main layout of the application
  display: grid;
  grid-template:
  "top-bar"        min-content
  "middle-section" ${p => p.bottomPanelVisible ? '60%' : '1fr'}
  "bottom-panel"   ${p => p.bottomPanelVisible ? '35%' : 'min-content'} 
  / 1fr;
  min-height: 600px;
  min-width: 800px;
  width: 100vw;
  height: 100vh;
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
`;

export const MiddleSection = styled.div`
  // middle section for the main layout
  display: grid;
  grid-template:
  "lists graph" 1fr
  / min-content 1fr;
`;


export const GraphCanvasContainer = styled.div` 
    // container for mounting the graph canvas
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
    // container inflater to hold graph canvas
    // and action notifier popup
    grid-area: graph;
    width: auto;
    height: auto;
    background-color: transparent;
    overflow: hidden;
`;
