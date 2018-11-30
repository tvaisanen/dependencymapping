//@flow
import React from 'react';
import {connect} from 'react-redux';

import * as appActions from '../../../actions/app.actions';
import {ActionLink} from "../resource-detail.styled";

import { EMPTY } from '../../../constants/types';

type EditButtonProps = {
    render: boolean,
}

export const EditButton = (props: EditButtonProps) => (
    props.render ?
        <ActionLink onClick={() => props.editDetail()}>
            edit
        </ActionLink>
        : null
);

export default connect(
    (state, props) => ({
        render: state.activeDetail.type !== EMPTY,
    }),
    (dispatch) => ({
        editDetail: () => dispatch(appActions.editDetail())
    })
)(EditButton);