//@flow
import React from 'react';
import styled from 'styled-components';
import {AddInputField, FilterInputField} from "../../common.components";


export type SelectionProps = {
    title: string,
    onFilterChange: (string) => void,
    options: Array<string>,
    selected: Array<string>,
    select: (value: string) => void,
    deselect: (value: string) => void,
    addItem: (value: string) => void,
    selectedLabel: string,
    createAndSelect: (name: string) => void
}

const SelectionWithFilterAndCreate = (props: SelectionProps) => (
    <SelectionBlock id="selection-block">
        <Block id="block">
            <SmallLabel>{props.title} ({props.options.length})</SmallLabel>

            <FilterInputField
                id="filter-input-field"
                onChange={(e) => props.onFilterChange(e.target.value)}

            />
            <OptionsToChooseFrom
                id="options-to-choose-from"
                remove={false}
                options={props.options}
                onClick={props.select}
            />

        </Block>
        <Block id="block">

            <SmallLabel>
                {props.selectedLabel}({props.selected.length})
            </SmallLabel>
            <AddInputField
                id="filter-input-field"
                addItem={props.createAndSelect}
                placeholder={"create new"}
            />
            <OptionsToChooseFrom
                id="options-to-choose-from"
                remove={true}
                options={props.selected}
                onClick={props.deselect}
            />
        </Block>
    </SelectionBlock>
);

SelectionWithFilterAndCreate.defaultProps = {
    options: [],
    selected: [],
};


export default SelectionWithFilterAndCreate;

const OptionList = styled.div`
  height: 6em;
  overflow-y: auto;
  overflow-x: hidden;
  flex-grow:1;
  width: 16em;
  background-color: rgba(255,255,255,0.1);
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
  justify-content: center;
  height: 100%;
  border-radius: 3px;
  background-color: ${p => p.theme.formFieldBackgroundColor};
`;

export const Block = styled.div`
  display: flex;
  flex-basis: 100%;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  padding: 0;
  > * {
    width: 100%;
  }
`;

export const SmallLabel = styled.small`
    display: flex;
    align-items: center;
    justify-content: center;
  letter-spacing: 0.05rem;
  min-height: 1.2em;
  padding: 3px 0;
  background-color: ${p => p.theme.cardHeaderBackgroundColor};
  border-bottom: ${p => p.theme.cardBorder};
`;
/*
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

*/
export const OptionItem = styled.div`

    font-size: small; 
    letter-spacing: 0.07em;
    text-align: center;
    cursor: pointer;
    margin: 2px 6px;
    border-radius: 3px;
    padding: 2px; 

    background: ${p => p.selected ?
    p.theme.listItemDarkBackground
    : 'rgba(22,22,22, 0.6)'
    };

   
    :hover {
        background-color: ${props =>
    props.remove ?
        'rgba(255,0,0,0.2)'
        : 'rgba(0,255,0,0.2)'
    };
    }
    
    transition: all .15s ease-in-out;
            
`;
