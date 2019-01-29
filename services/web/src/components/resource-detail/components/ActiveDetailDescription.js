import React            from 'react';
import {connect}        from 'react-redux';
import styled           from 'styled-components';
import MarkDownRenderer from 'react-markdown-renderer';

const ActiveDetailDescription = (props) => (
    <Container>
        <MarkDownRenderer
            markdown={props.description ? props.description : "Edit to add description."}/>
    </Container>
);

export default connect(
    (state) => ({
        description: state.activeDetail.data.description,
    }), {}
)(ActiveDetailDescription)

const Container = styled.div`
    background:rgba(60,63,65,0.35);
    border-radius: 3px;
    overflow-y: scroll;
    border: 1px solid rgba(255,255,255,0.15);
    height: inherit;
    //height: 16em;
    flex-grow: 1;
    width: inherit;
    text-align: justify;
    text-justify: inter-character;
    overflow-x: hidden;
    overflow-y: auto;
    
    > * {
      heigh: inherit;
      width: inherit;
      padding: 12px;
      p {
        text-wrap: wrap;
      }
      box-sizing: border-box;
    }
`;
