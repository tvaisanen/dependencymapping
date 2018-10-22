import React from 'react';
import styled from 'styled-components';
import {FilterInputField, AddInputField} from "../../components/common.components";

const cValid = "rgba(10,255,10,0.2)";
const cInvalid = "rgba(255,0,0,0.3)";

export const Inflater = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: rgba(255,255,255,0.1);
    width: auto;
    height: inherit;
    padding: 2px;
    flex-grow: 1;
    border-radius: 3px;
`;


export const Container = styled.div`
    max-width: 34em;
    display: flex;
    flex-direction: ${props => props.column ? 'column' : 'row'};
    background: ${props => props.bg};
    justify-content: center;
    align-items: center;
    align-self: center; 
    width: ${p =>
        p.visible ?
            "100%"
            : "0"
    };
    visibility: ${p =>
        p.visible ?
            'visible'
            : 'hidden'
            
    };
    flex-grow: 3;
    padding: 0 12px;  
    border-radius: 3px;
    transform: ${p =>
    p.visible ?
        "scaleX(1)"
        : "scaleX(0)"};
    transition:
      transform 300ms ease-in-out,
      width 500ms ease-in-out,
      flex-grow 1000ms ease-in-out;
      
    transform-origin: right;
    
`;

export const Header = styled.h2`
    margin: 0;
`;

export const Label = styled.label``;

export const Button = styled.button`
  margin: 4px;
  padding: 4px;
  border-radius: 3px;
  font-weight: bold;
  color: white;
  background-color: ${p => p.cancel ?
    'rgba(244,0,0,0.5)'
    : 'rgba(0,244,0,0.5)'
    };
  cursor: pointer;
`;

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
              background-color: ${props =>
    props.remove ?
        'rgba(255,0,0,0.35)'
        : 'rgba(255,255,0,0.5)'};
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
                {
            edit ?
                <Button
                    cancel onClick={remove}>delete</Button>
                : null
        }
        <Button
            cancel
            onClick={cancel}>
            cancel
        </Button>
        <Button
            onClick={save}>
            save
        </Button>

    </ButtonBox>
);


const OptionList = styled.div`
  height: 6em;
  overflow-y: scroll;
  overflow-x: hidden;
  width: 16em;
`;

const OptionsToChooseFrom = ({options, onClick, remove}) => (
    <OptionList>
        {options.map((option, i) => <OptionItem
            key={i}
            remove={remove}
            onClick={
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

export const SmallLabel = styled.small`
  letter-spacing: 0.05rem;
`;


export const FormSelectionBlock = (
        {
            labelOption,
            onFilterChange,
            options = [], selected = [],
            select, deselect, addItem,
            selectedLabel
        }
    ) => (
    <SelectionBlock id="selection-block">
        <Block id="block">
            <SmallLabel>{labelOption} <small>({options.length})</small></SmallLabel>
            <FilterInputField id="filter-input-field"
                onChange={(e) => onFilterChange(e)}
            />
            <OptionsToChooseFrom id="options-to-choose-from"
                remove={false}
                options={options}
                onClick={select}
            />

        </Block>
        <Block id="block">
            <SmallLabel>{selectedLabel}: {selected.length}</SmallLabel>
            <AddInputField
                id="filter-input-field"
                addItem={addItem}
                placeholder={"create new"}
            />
            <OptionsToChooseFrom id="options-to-choose-from"
                remove={true}
                options={selected}
                onClick={deselect}
            />
        </Block>
    </SelectionBlock>
);