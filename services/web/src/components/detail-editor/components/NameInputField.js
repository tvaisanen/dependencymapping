import React from 'react';
import {connect} from 'react-redux';
import * as detailEditorActions from '../detail-editor.actions';

const NameInputField = (props) => {
    return (
        <React.Fragment>
            <label>name</label>
            <br/>

            {props.error ?
                <span>{this.state.error}</span>
                : null
            }

            <input type={"text"}
                   readOnly={props.readOnly}
                   value={props.name ? props.name : ""}
                   onChange={(e) => {
                       if (e.target.value===""){this.value=""}
                       props.onChange(e.target.value);
                   }}/>
        </React.Fragment>
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