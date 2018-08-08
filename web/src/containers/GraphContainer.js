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
    min-height:400px;
    min-width: 400px;
    width: inherit;
    height: inherit;
    background: rgba(255,255,255,.8); 
    & > * { height: inherit; }
    & > div > canvas { height: 100%; }
`;

const GraphCanvasInflater = styled.div`
    width: 100%;
    height: 100%;
    background-color: white;

`;