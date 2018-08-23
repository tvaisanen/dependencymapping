import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
background-color: transparent;
  text-align: center;
  max-width: 200px;
  width: 100%;
  border: none; 
  border-bottom: 1px solid grey; 
  margin: 0 8px 8px 0;
  color: rgba(255,255,255,0.8);
  font-size: 1em;
  flex-grow: 1;
  :focus::placeholder{
    color: transparent;
  }
`;

const Field = styled.div`
  display: flex;
  justify-self: center;
  padding: 4px;
`;

const Btn = styled.span`
  width: 1em;
  height: 1em;
  cursor: pointer;

`;

const Icon = styled.span`
  position: relative;
  height: 1em;
  width: 0;
  left: -2em;
`;

export const FilterInputField = ({onChange}) => {

    return <Field>
        <Input
        type="text"
        placeholder="filter..."
        onChange={onChange}
    />
        <Icon>&#x1f50d;</Icon>
    </Field>
}

export const AddInputField = ({addItem, placeholder}) => {
    let input;

    return <Field>
       <Input
           innerRef={ref => input = ref}
           type="text"
           placeholder={placeholder}
       />
       <Btn onClick={() => addItem(input.value)}>
       &#x2b;
       </Btn>
    </Field>
}