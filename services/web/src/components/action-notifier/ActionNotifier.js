//@flow

import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {clearEventHook} from '../../store/event-hook/'

const Anchor = styled.div`
  display: flex;
  position: relative;
  z-index: 2;
  justify-content: center;
  height: 0; 
  > * {
    visibility: ${p => p.visible ? "visible" : "hidden"};
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  top: 12px;
  border: 1px solid grey;
  border-radius: 3px;
  position: relative;
  height: 60px;
  width: 200px;
  background-color: #c4eec4; 
`;

const CancelBtn = styled.div`

  font-size: small;
  letter-spacing: 0.04rem;
  cursor: pointer;
 
  :hover{
    color: red; 
  }
`;

type ActionNotifierProps = {
    hook: string,
    callback: (any) => void,
    notification: string,
    clearHook: () => void
}


const ActionNotifier = (props: ActionNotifierProps) => {
    console.info(props)
    return (

        <Anchor visible={props.eventHook.hook}>
            <Content>
                {props.eventHook.hook ? "true" : "false"}
                {props.eventHook.notification}
                <CancelBtn onClick={props.clearHook}>cancel</CancelBtn>
            </Content>
        </Anchor>
    )
};

function mapStateToProps(state) {
    return {
        eventHook: state.eventHook
    }
}

function mapDispatchToProps(dispatch) {
    return {
        clearHook: () => dispatch(clearEventHook())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ActionNotifier);