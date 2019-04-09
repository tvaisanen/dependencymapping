//@flow

import React from 'react';
import {connect} from 'react-redux';
import {clearEventHook} from '../../store/event-hook/'

import { Anchor, Content, Notification, ActionText, CancelBtn } from "./action-notifier.styled";


type ActionNotifierProps = {
    hook: string,
    callback: (any) => void,
    notification: string,
    clearHook: () => void,
    optionalAction: () => void,
}


const ActionNotifier = (props: ActionNotifierProps) => {

    const {hook, notification, optionalAction} = props.eventHook;

    if (props.optionalAction) {
        props.optionalAction()
    }

    return (

        <Anchor visible={hook}>
            <Content>
                <Notification>{notification}
                {optionalAction ?
                    <ActionText onClick={() => optionalAction.callback()}>
                        {optionalAction.name}
                    </ActionText>
                    : null
                }
                </Notification>
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