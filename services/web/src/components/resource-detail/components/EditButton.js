//@flow
import React from 'react';
import {connect} from 'react-redux';

import { editDetail } from '../../../store/ui/ui.actions';
import {ActionLink} from "../resource-detail.styled";
import * as detailFormActions from '../../../store/detail-form/detail-form.actions';

import { EMPTY } from '../../../constants/types';
import {CONNECTION} from "../../../constants";
import styled from 'styled-components';
import {deleteConnection} from "../../../store";

type EditButtonProps = {
    render: boolean,
    editDetail: () => void
}

const PromptDelete = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  border-radius: 3px;
  background-color: rgba(255,0,0,0.4);
  cursor: pointer;
  :hover{
    background-color: rgba(255,0,0,0.6);
  }
`;

export const EditButton = (props: EditButtonProps) => {
    const editLink = <ActionLink onClick={() => props.editDetail()}>edit</ActionLink>;
    const suggestDelete =  <PromptDelete onClick={() => {
        console.log("delete")
        console.log(props.activeDetail)
        props.deleteConnection(props.activeDetail.data)
    }}>Delete this connection!</PromptDelete>;
    if (props.render){
        return props.suggestDelete ? suggestDelete : editLink;
    }
    return null;
};

export default connect(
    (state, props) => ({
        activeDetail: state.activeDetail,
        render: state.activeDetail.type !== EMPTY,
        suggestDelete: isConnectionWithoutReferenceAsset(state.activeDetail)
    }),
    (dispatch) => ({
        deleteConnection: (connection) => dispatch(deleteConnection({form: connection})),
        editDetail: () => {
            dispatch(editDetail());
            dispatch(detailFormActions.setFormEditTrue());
        }
    })
)(EditButton);

function isConnectionWithoutReferenceAsset(activeDetail){

    // todo: can be simplified?
    if (activeDetail.type === CONNECTION){
        if (activeDetail.data.source && activeDetail.data.target)  {
            return false;
        }
        return true;
    }

    return false;

}