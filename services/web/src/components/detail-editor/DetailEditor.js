//@flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  top:0;
  right:0;
  width: 50%;
  min-height: 400px;
  height: 400px;
  z-index: 20;
  border: grey;
  border-radius: 3px;
  margin: 12px;
  background-color: rgba(0,0,0,1);
  color: white;
`;

type DetailEditorProps = {}

const DetailEditor = (props: DetailEditorProps) => {
   return <Container>
       DetailEditor
       <div>
           {Object.keys(props)
               .map(key => <div>{key}: {JSON.stringify(props[key])}</div>)}
       </div>
   </Container>
}

export default connect(
    (state, props) => ({...state.detailForm}),
    {}
    )(DetailEditor);