//@flow

import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {clearEventHook} from '../../store/event-hook/'

const Anchor = styled.div`

  display: flex;
  position: relative;
  z-index: 2;
  justify-content: flex-start;
  width: 100%;
  height: 0; 
  
  > * {
    visibility: ${p => p.visible ? "visible" : "hidden"};
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 12px;
  flex-grow: 1;
  border: 1px solid grey;
  position: relative;
  height: min-content;
  color: rgba(255,255,255,1);
  letter-spacing: 0.06rem;
  font-size: small;
  background-color: rgba(20,20,20,0.5); 
`;

const CancelBtn = styled.div`

  font-size: small;
  letter-spacing: 0.04rem;
  cursor: pointer;
  
  :hover{
    color: red; 
  }
`;

const Notification = styled.div`
    letter-spacing: 0.04rem;
`;

type ActionNotifierProps = {
    hook: string,
    callback: (any) => void,
    notification: string,
    clearHook: () => void,
    optionalAction: () => void,
}


const ActionNotifier = (props: ActionNotifierProps) => {
    const {hook, notification, optionalAction} = props.eventHook;
    console.info(props)
    if (props.optionalAction) {
        props.optionalAction()
    }

    console.log(typeof props.eventHook.optionalAction)

    return (

        <Anchor visible={hook}>
            <Content>
                <Notification>{notification}</Notification>
                {optionalAction ?
                    <button onClick={() => optionalAction.callback()}>
                        {optionalAction.name}
                    </button>
                    : null
                }
                <CancelBtn onClick={props.clearHook}>&#10005;</CancelBtn>
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