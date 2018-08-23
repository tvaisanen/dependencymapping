import React from 'react';
import styled from 'styled-components';
import {FilterInputField, AddInputField} from "../../components/common.components";

const cValid = "rgba(10,255,10,0.2)";
const cInvalid = "rgba(255,0,0,0.3)";

export const Inflater = styled.div`
    display: flex;
    flex-direction: row;
    background: rgba(255,255,255,0.1);
    width: 100%;
    padding: 2px;
    flex-grow: 1;
    border-radius: 3px;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: ${props => props.column ? 'column' : 'row'};
    background: ${props => props.bg};
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    flex-grow: 1;
    padding: 0 12px;  
    border-radius: 3px;
`;

export const Header = styled.h2`
    margin: 0;
`;

export const Label = styled.label``;

export const Button = styled.button``;

export const Input = styled.input`
    text-align: center;
    font-style: ${p => p.lock ? 'italic' : null};
    color: ${p => p.lock ? 'grey' : null};
    width: inherit;
    background-color: ${ props =>
    props.check ? (props.valid ? cValid : cInvalid) : null
    };
    border-radius: 3px;
`;

export const TextArea = styled.textarea`
    width: inherit;
    min-width: 200px;
    background-color: ${ props =>
    props.check ? (props.valid ? cValid : cInvalid) : null
    };
    border-radius: 3px;
`;

export const Selection = styled.select`
    width: 100%;
    border-radius: 3px;
    border: none;

`;

export const OptionItem = styled.div`
            font-size: small;
            background-color: rgba(255,255,255,0.2);
            padding: 2px;
            margin: 2px 0; border-radius: 3px; box-shadow: 0 0 2px rgba(255,255,255,0.1);
            :hover {
              background-color: rgba(255,255,255,0.35);
            }
            transition: all .15s ease-in-out;
            cursor: pointer;
            overflow: hidden;
            text-overflow: ellipsis;
            min-height: 1em;
`;

export const Option = styled.option`
`;

export const ButtonBox = styled.div`
    margin: 12px 0;
`;

export const SelectionList = styled.select`
    overflow-y: auto;
    overflow-x: hidden;
    min-height: 5em;
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
);



const OptionList = styled.div`
  height: 6em;
  overflow-y: scroll;
  overflow-x: hidden;
  width: 16em;
`;

const OptionsToChooseFrom = ({options, onClick}) => (
    <OptionList>
        {options.map(option => <OptionItem onClick={
            () => onClick(option)
        }>{option}</OptionItem>)}
    </OptionList>
);

const SelectionBlock = styled.div`
  display: flex;
  flex-direction: row;
  padding: 4px;
  border-radius: 3px;
  border: solid 1px; rgba(244,244,244,0.1);
  background-color: rgba(22,22,22,0.1);
  height: 100%;
  margin: 2px;

`;

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  padding: 4px;
  

`;


export const FormSelectionBlock = ({
                                        labelOption,
                                       onFilterChange,
                                       options, selected,
                                        select, deselect, addItem
                                   }) => (
    <SelectionBlock>
        <Block>
            <small>{labelOption} {options.length}</small>
            <FilterInputField
                onChange={(e) => onFilterChange(e)}
            />
            <OptionsToChooseFrom
                options={options}
                onClick={select}
            />

        </Block>
        <Block>
            <small>selected: {selected.length}</small>
            <AddInputField
                addItem={addItem}

                placeholder={"create new"}
            />
            <OptionsToChooseFrom
                options={selected}
                onClick={deselect}
            />
        </Block>
    </SelectionBlock>
);