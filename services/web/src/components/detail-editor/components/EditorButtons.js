//@flow
import React from 'react';
import { connect } from 'react-redux';
import * as detailEditorActions from '../detail-editor.actions';
import styled from 'styled-components';
import * as appActions from '../../../actions/app.actions';
import { BROWSE } from "../../../constants/views";

type EditorButtonProps = {
    onCancel: () => void,
    onDelete: () => void,
    onSave: () => void,
    edit: boolean
}

//{cancel, save, remove, edit}

export const EditorButtons = (props: EditorButtonProps) => (
    <ButtonRow>
        {props.edit ? <Button cancel onClick={props.onDelete}>delete</Button> : null}
        <Button cancel onClick={props.onCancel}>cancel</Button>
        <Button onClick={props.onSave}>save</Button>
    </ButtonRow>
);

EditorButtons.defaultProps = {
    edit: () => false,
    onCancel: () => alert('todo'),
    onSave: () => alert('todo'),
    onDelete: () => alert('todo'),
};


const mapStateToProps = (state, props) => ({
    description: state.detailForm.description
});

const mapDispatchToProps= (dispatch) => ({
    onChange: (value: string) => dispatch(detailEditorActions.onResourceDescriptionChange((value:string))),
    onCancel: () => dispatch(detailEditorActions.closeEdit()),
    onSave: ()  => dispatch(detailEditorActions.onSave()),
    onDelete: ()  => dispatch(detailEditorActions.onDelete())

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditorButtons);


export const ButtonRow = styled.div`
    display:flex;
    justify-content: center;
    min-height: 2em;
`;

export const Button = styled.button`
  margin: 4px;
  padding: 2px;
  border-radius: 3px;
  font-weight: bold;
  color: white;
  background-color: ${p => p.cancel ?
    'rgba(244,0,0,0.5)'
    : 'rgba(0,244,0,0.5)'
    };
  cursor: pointer;
`;
