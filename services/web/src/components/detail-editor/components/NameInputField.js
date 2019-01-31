import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import * as detailEditorActions from '../detail-editor.actions';

const Container = styled.div`
    display: flex;
    background-color: ${p=>p.theme.formFieldBackgroundColor};
    padding: 6px;
    margin-bottom: 6px;
    align-items: center;
    border-radius: 3px;  
    border: ${p=>p.theme.insetBorder}; 
`;

const Label = styled.label`
    margin: 0 10px;
    font-size: small;
`;

const Input = styled.input`
    flex-grow: 1;
    border-radius: 3px;
`;

const NameInputField = (props) => {
    return (
        <Container>
            {props.error ?
                <span>{props.error}</span>
                : null
            }
            <Label>name</Label>
            <Input type={"text"}
                   readOnly={props.readOnly}
                   value={props.name ? props.name : ""}
                   onChange={(e) => {
                       if (e.target.value===""){this.value=""}
                       props.onChange(e.target.value);
                   }}
            />
        </Container>
    )
};

const mapStateToProps = (state, props) => ({
    readOnly: state.detailForm.edit, // name is read only if editing
    name: state.detailForm.name,
    error: state.detailForm.errors.name
});

const mapDispatchToProps = (dispatch) => ({
    onChange: (value: string) => dispatch(detailEditorActions.onResourceNameChange((value: string)))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NameInputField);