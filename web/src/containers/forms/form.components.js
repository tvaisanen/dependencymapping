import React from 'react';
import styled from 'styled-components';

const cValid = "rgba(10,255,10,0.2)";
const cInvalid = "rgba(255,0,0,0.3)";

export const Container = styled.div`
    display: flex;
    flex-direction: ${props => props.column ? 'column' : 'row'};
    background: ${props => props.bg};
    justify-content: flex-start;
    align-items: center;
    height: inherit;
    width: 100%;
    height: 100%;
    
    flex-grow: 1;
    padding: 0 12px;  
`;

export const Header = styled.h2`
    margin: 0;
`;

export const Label = styled.label``;

export const Button = styled.button``;

export const Input = styled.input`
    width: inherit;
    background-color: ${ props =>
    props.check ? (props.valid ? cValid : cInvalid) : null
    };
`;

export const TextArea = styled.textarea`
    width: inherit;
    min-width: 200px;
    background-color: ${ props =>
    props.check ? (props.valid ? cValid : cInvalid) : null
    };
`;

export const Selection = styled.select`
    width: 100%;
    border-radius: 3px;
    border: none;

`;

export const Option = styled.option`
`;

export const ButtonBox = styled.div`
    margin: 12px 0;
`;

export const SelectionList = styled.select`
    overflow-y: auto;
    overflow-x: hidden;
    height: 200px;
    width: 200px;
    background: rgba(255,255,255,.4);
`;


export const ErrorMsg = styled.span`
  color: rgba(255,50,50,0.8);
  font-size: smaller;
  height: 1rem;
`;

export const ButtonRow = ({cancel, save, remove, edit}) => (

        <ButtonBox>
            <Button
                onClick={cancel}>
                cancel
            </Button>
            <Button
                onClick={save}>
                save
            </Button>
            {
                edit ?
                    <Button onClick={remove}>delete</Button>
                    : null
            }
        </ButtonBox>
)