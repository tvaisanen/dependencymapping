//@flow
import React from 'react';
import { connect } from 'react-redux';
import * as detailEditorActions from '../detail-editor.actions';
import styled from 'styled-components';
import { CREATE } from "../../../constants/views";
import { BROWSE } from "../../../constants/views";

type EditorButtonProps = {
    onCancel: () => void,
    onDelete: () => void,
    onSave: () => void,
    edit: boolean,
    view: CREATE | BROWSE
}

//{cancel, save, remove, edit}

export const EditorButtons = (props: EditorButtonProps) => (
    props.view === CREATE ? <ButtonRow>
        {
            props.edit ? // render edit button if editing a detail
                <Button cancel onClick={props.onDelete}>delete</Button>
                : null
        }
        <Button cancel onClick={props.onCancel}>cancel</Button>
        <Button onClick={props.onSave}>save</Button>
    </ButtonRow>: null
);

EditorButtons.defaultProps = {
    edit: () => false,
    onCancel: () => alert('todo'),
    onSave: () => alert('todo'),
    onDelete: () => alert('todo'),
};


const mapStateToProps = (state, props) => ({
    view: state.app.bottomPanel.view,
    edit: state.detailForm.edit,
    description: state.detailForm.description
});

const mapDispatchToProps= (dispatch) => ({
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
    margin-right: 12px;
`;

export const Button = styled.button`
  border: none;
  margin: 0 5px;
  border-radius: 3px;
  letter-spacing: 0.07rem;
  color: white;
  font-size: x-small;
  padding: 2px 4px;
  background-color: ${p => p.cancel ?
    'rgba(244,0,0,0.3)'
    : 'rgba(0,244,0,0.3)'
    };
  cursor: pointer;
`;
