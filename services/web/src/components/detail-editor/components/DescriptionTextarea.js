import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as detailEditorActions from '../detail-editor.actions';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 6px;
    background-color: ${p=>p.theme.formFieldBackgroundColor};
    border-radius: 3px;
    border: ${p=>p.theme.insetBorder}; 
`;

const Textarea = styled.textarea`
    grow: 1;
    resize: none;
`;

const Label = styled.label`
    font-size: small;
`;

const DescriptionTextarea = (props) => {
    return (
        <Container>
            <Label> description</Label>
            <Textarea
                style={{flexGrow:1}}
                rows="10"
                value={props.description}
                valid={true}
                onChange={(e) => {
                    props.onChange(e.target.value);
                }}/>
        </Container>
    )
};

const mapStateToProps = (state, props) => ({
    description: state.detailForm.description
});

const mapDispatchToProps= (dispatch) => ({
    onChange: (value: string) => dispatch(detailEditorActions.onResourceDescriptionChange((value:string)))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DescriptionTextarea);