import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {initGraph} from "../actions";

/**
 *  Container for the canvas required for graphing.
 *
 *
 */


const GraphContainer = (props) => {
    return (
        <GraphCanvasInflater>
            <GraphCanvasContainer id="cy"/>
        </GraphCanvasInflater>);
};

GraphContainer.propTypes = {
    initGraph: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return state.cy;
};

const mapDispatchToProps = (dispatch) => {
    return {
        initGraph: (container) => dispatch(initGraph(container))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(GraphContainer);

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

const GraphCanvasInflater = styled.div`
width: 100%;
    height: 100%;
    background-color: white;

`;