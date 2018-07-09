import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class DefaultForm extends Component {

    
    render() {
        const { header, connected } = this.props;
        return (
        <FormContainer>
            <h2>{header}</h2>
            <InputLabel>Name</InputLabel>
            <input type="text"/>
            <InputLabel>Description</InputLabel>
            <textarea/>
            { connected ?
            <div> 
                <InputLabel>Connected to</InputLabel>
                <select/>
            </div>
            : null}
            <InputLabel>Categories</InputLabel>
            <select/>
        </FormContainer>
        );
    }
}

DefaultForm.propTypes = {
    header: PropTypes.string.isRequired,
};

export default DefaultForm;

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;

`;

const InputLabel = styled.label`

`;