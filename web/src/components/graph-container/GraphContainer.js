import React from 'react';
import styled from 'styled-components';

/**
 *  Container for the canvas required for graphing.
 */


const GraphContainer = () => {
    return (
        <GraphCanvasInflater>
            <GraphCanvasContainer id="cy"/>
        </GraphCanvasInflater>);
};

export default GraphContainer;

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

const GraphCanvasInflater = styled.div`
    width: 100%;
    height: 100%;
    min-height: 360px;
    background-color: transparent;
    overflow: hidden;
`;