import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import * as detailFormActions from '../../../store/detail-form/detail-form.actions';
import * as detailEditorActions from '../detail-editor.actions';

import { Label, SelectionField,  FieldGroup, Select, FieldsContainer } from "../detail-editor.styled";

import TagSelection from "./TagSelection";
import DescriptionTextarea from "./DescriptionTextarea";

export const ConnectionSelections = () => (
    <React.Fragment>
        <TagSelection/>
    </React.Fragment>
);

export const WrapFields = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  padding: 6px; 
  margin: 6px 0;
  background-color: ${p => p.theme.formFieldBackgroundColor};
  flex-shrink: 1;
  flex-grow: 3;
  align-content: flex-start;
   border: 1px solid rgba(255,255,255,0.15);
`;


export const ConnectionForm = (props) => (
    <React.Fragment>
        <WrapFields>
            <SelectSourceAsset
                label={"source"}
                onChange={props.onSourceSelection}
                selected={props.source.name}
                {...props}/>
            <SelectTargetAsset
                label={"target"}
                selected={props.target.name}
                onChange={props.onTargetSelection}
                {...props}/>
        </WrapFields>
        <DescriptionTextarea/>
    </React.Fragment>
);

type SelectAssetProp = { selected: string, edit: boolean };

export const SelectSourceAsset = (props: SelectAssetProp) => (
    props.edit ? <div>{props.selected}</div> : <SelectAsset {...props}/>
);

export const SelectTargetAsset = (props: SelectAssetProp) => (
    props.edit ? <div>{props.selected}</div> : <SelectAsset {...props}/>
);

function mapStateToProps(state, props) {
    return {
        edit: state.detailForm.edit,
        assets: state.assets.map(asset => asset.name),
        source: state.detailForm.source,
        target: state.detailForm.target,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onSourceSelection: (value: string) => dispatch(detailEditorActions.onSourceSelection(value)),
        onTargetSelection: (value: string) => dispatch(detailEditorActions.onTargetSelection(value)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectionForm);

/*
const SelectAsset = (props) => {
    return <div>
            <Label for={`${props.label}-asset`}>{props.label}</Label>
        <Select
            selected={"none"}
            onChange={(e) => {
                this.selected = e.target.value;
                props.onChange((e.target.value: string));
            }}>
            {
                props.assets.map(option => (
                    <option selected={option === props.selected}
                            value={option}>
                        {option}
                    </option>
                ))
            }
        </Select>
    </div>

};
*/
const SelectAsset = (props) => {
    return <SelectionField id={"select-asset-group"}>

        <Label for={`${props.label}-asset`}>{props.label}</Label>
        <Select
        selected={"none"}
        onChange={(e) => {
            this.selected = e.target.value;
            props.onChange((e.target.value: string));
        }}>
        {props.assets.map(option => (
            <option
                selected={option === props.selected}
                value={option}
            >{option}</option>))}
    </Select></SelectionField>
};