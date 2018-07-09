import React, { Component } from 'react';
import styled from 'styled-components';
class GraphContainer extends Component {

    constructor(){
        super();
        this.state = {
            cy: null
        }
    }

    componentDidMount(){

    }

    
    render() {
        return (
              <GraphCanvasContainer id="cy" />
        );
    }
}

export default GraphContainer;

export const GraphCanvasContainer = styled.div`
    position: relative;
    min-height:400px;
    min-width: 400px;
    width: inherit;
    height: inherit;
    background: rgba(255,255,255,.8);

    
    & > * {
        height: inherit;
    }

    & > div > canvas {
        height: 100%;
    }
`;
