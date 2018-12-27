import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import * as detailFormActions from '../../../store/detail-form/detail-form.actions';
import * as detailEditorActions from '../detail-editor.actions';

import {Label, SelectionField, FieldGroup, Select, FieldsContainer} from "../detail-editor.styled";

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
  margin-bottom: 6px;
  background-color: ${p => p.theme.formFieldBackgroundColor};
  flex-shrink: 1;
  flex-grow: 3;
  align-content: flex-start;
   border: 1px solid rgba(255,255,255,0.15);
`;

const SpaceAround = styled.div`
  display: flex;
  justify-content: space-around; 
  align-items: center;
  flex-basis: 100%;
  padding: 6px;
`;


const Input = styled.input`
  flex-grow:1;
`;

const CheckBoxes = styled.div`
  border: ${p => p.theme.cardBorder};
  margin-left: 6px;
  
  > label {
    font-size: 0.8em;
  }
 

`;


export const ConnectionForm = (props) => (
    <React.Fragment>
        {console.info(props)}
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
            <SpaceAround>
                <Label>label</Label>
                <Input
                    value={props.edgeLabel}
                    onChange={(e) => props.onEdgeLabelChange(e.target.value)}
                    type="text"/>
                <CheckBoxes>
                    <label>show arrow for</label><br/>
                    <Label>source</Label>
                    <input
                        type="checkbox"
                        checked={props.sourceArrow}
                        onChange={props.toggleSourceArrow}
                    />
                    <Label>target</Label>
                    <input
                        type="checkbox"
                        checked={props.targetArrow}
                        onChange={props.toggleTargetArrow}
                    />
                </CheckBoxes>
            </SpaceAround>
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
        sourceArrow: state.detailForm.sourceArrow,
        targetArrow: state.detailForm.targetArrow,
        edgeLabel: state.detailForm.edgeLabel
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onSourceSelection: (value: string) => dispatch(detailEditorActions.onSourceSelection(value)),
        onTargetSelection: (value: string) => dispatch(detailEditorActions.onTargetSelection(value)),
        onEdgeLabelChange: (value: string) => dispatch(detailEditorActions.onEdgeLabelChange(value)),
        toggleSourceArrow: ()              => dispatch(detailEditorActions.toggleSourceArrow()),
        toggleTargetArrow: ()              => dispatch(detailEditorActions.toggleTargetArrow())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectionForm);

const SelectAsset = (props) => (
    <SelectionField id={"select-asset-group"}>
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
        </Select>
    </SelectionField>
);