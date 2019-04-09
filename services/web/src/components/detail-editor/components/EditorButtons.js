//@flow
import React from 'react';
import {connect} from 'react-redux';
import * as detailEditorActions from '../detail-editor.actions';
import styled from 'styled-components';
import {BROWSE, CREATE} from "../../../constants/views";
import {MAPPING, TAG} from "../../../constants";

const {REACT_APP_API_PATH} = process.env;

// todo: refactor
import axios from 'axios';

type EditorButtonProps = {
    onCancel: () => void,
    onDelete: () => void,
    onSave: () => void,
    edit: boolean,
    view: CREATE | BROWSE
}

//{cancel, save, remove, edit}

const Btn = styled.button`
  color: white;
  font-weight: bold;
  border-radius: 3px;
  background-color: rgba(255,255,255,0.1);
  cursor: pointer;
  :focus {
    outline: none;
  }
`;

export const EditorButtons = (props: EditorButtonProps) => {
    if (props.view === CREATE) {
        return <ButtonRow>{// render edit button if editing a detail
                !props.edit ?
                    null :
                    <Button
                        cancel
                        onClick={props.onDelete}>
                        delete
                    </Button>
            }
            <Button cancel onClick={props.onCancel}>cancel</Button>
            <Button onClick={props.onSave}>save</Button>
        </ButtonRow>
    } else {
        return <DownloadButton
            type={props.activeDetail.type}
            id={props.activeDetail.data._id}/>
    }
};



const downloadBtnConfig = {
    [MAPPING]: {
        label: `Download mapping as JSON`,
        action: (id) => {
            // todo: refactor to APIclient
            axios.get(`http://${REACT_APP_API_PATH}/mapping/export/${id}`)
                .then(response => {
                    const element = document.createElement('a');
                    const formattedFile = encodeURIComponent(
                        JSON.stringify(response.data, null, 2)
                    );
                    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + formattedFile);
                    element.setAttribute('download', `${id}.json`);

                    element.style.display = 'none';
                    document.body.appendChild(element);

                    element.click();

                    document.body.removeChild(element);
                })
                .catch(err => console.err(err))
        }
    }
};


// todo: cleaning

const DownloadButton = ({type, id}) => {

    if (Object.keys(downloadBtnConfig).indexOf(type) !== -1) {

        const {label, action} = downloadBtnConfig[type];
        return <Btn onClick={() => action(id)}>{label}</Btn>
    }
    return null;
};


EditorButtons.defaultProps = {
    edit: () => false,
    onCancel: () => alert('todo'),
    onSave: () => alert('todo'),
    onDelete: () => alert('todo'),
};

// <EditorButtons message={hello}/>
const mapStateToProps = (state, props) => ({
    view: state.app.bottomPanel.view,
    edit: state.detailForm.edit,
    description: state.detailForm.description,
    activeDetail: state.activeDetail,
    activeDetailType: state.activeDetail.type,
    activeDetailID: state.activeDetail.data._id,
    activeTagDetailName: state.activeDetail.data.name,
});

const mapDispatchToProps = (dispatch) => ({
    onCancel: () => dispatch(detailEditorActions.closeEdit()),
    onSave: () => dispatch(detailEditorActions.onSave()),
    onDelete: () => dispatch(detailEditorActions.onDelete()),
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
