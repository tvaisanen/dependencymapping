//@flow
import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import * as detailEditorActions from '../detail-editor.actions';
import {AddInputField, FilterInputField} from "../../common.components";

import {ASSET, TAG} from '../../../constants/types';

export type SelectionProps = {
    title: string,
    onFilterChange: () => void,
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
                <SmallLabel>{props.title}
                    <small>({props.options.length})</small>
                </SmallLabel>
                <FilterInputField id="filter-input-field"
                                  onChange={(e) => props.onFilterChange(e)}
                />
                <OptionsToChooseFrom id="options-to-choose-from"
                                     remove={false}
                                     options={props.options}
                                     onClick={props.select}
                />

            </Block>
            <Block id="block">
                <SmallLabel>{props.selectedLabel}: {props.selected.length}</SmallLabel>
                <AddInputField
                    id="filter-input-field"
                    addItem={props.createAndSelect}
                    placeholder={"create new"}
                />
                <OptionsToChooseFrom id="options-to-choose-from"
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
  background-color: rgba(22,22,22,0.1);
  margin: 2px;

`;

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4px;
`;

export const SmallLabel = styled.small`
  letter-spacing: 0.05rem;
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