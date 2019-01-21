//@flow
import React from 'react';
import {ASSET} from '../../../constants/types';
import {connect} from 'react-redux'
import styled from 'styled-components';
import {nodeShapes, colorOptions} from "../../../configs/configs.cytoscape";
import * as detailEditorActions from '../detail-editor.actions'
import { Label, SelectionField, FieldGroup, Select } from "../detail-editor.styled";

type SelectionMenusProps = {
    formType: string,
    assets: Array<String>,
    setValue: (object) => void,
    onAssetGroupSelection: (value:string) => void,
    onNodeColorSelection: (value:string) => void,
    onNodeShapeSelection: (value:string) => void,
    group: string,
    nodeShape: string,
    nodeColor: string
}

const SelectionMenus = (props: SelectionMenusProps) => (
    props.formType === ASSET ?
        <Container id={"form-select-fields"}>
            <NodeGroupSelection
                selected={props.group}
                onChange={props.onAssetGroupSelection}
                assets={props.assets}/>
            <FieldGroup>
            <NodeShapeSelection
                selected={props.nodeShape}
                onChange={props.onNodeShapeSelection}/>
            <NodeColorSelection
                selected={props.nodeColor}
                onChange={props.onNodeColorSelection}/>
            </FieldGroup>
        </Container>
        : null
);

const mapStateToProps = (state, props) => ({
    assets: ["none", ...state.assets.map(asset=>asset.name)],
    formType: state.detailForm.formType,
    group: state.detailForm.group,
    nodeShape: state.detailForm.nodeShape,
    nodeColor: state.detailForm.nodeColor
});

const mapDispatchToProps = (dispatch) => ({
    onAssetGroupSelection: (value: string) => dispatch(detailEditorActions.onAssetGroupSelection((value: string))),
    onNodeColorSelection: (value: string) => dispatch(detailEditorActions.onNodeColorSelection((value: string))),
    onNodeShapeSelection: (value: string) => dispatch(detailEditorActions.onNodeShapeSelection((value: string)))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectionMenus)

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  padding: 6px; 
  margin-bottom: 6px;
  background-color: ${p => p.theme.formFieldBackgroundColor};
  flex-shrink: 1;
  flex-grow: 3;
  align-content: flex-start;
   border: 1px solid rgba(255,255,255,0.15);
`;



const NodeGroupSelection = (props) => {
    return <SelectionField id={"select-asset-group"}>
        <Label for="node-group">group</Label><br/>
        <Select
        selected={"none"}
        onChange={(e) => {
            this.selected = e.target.value;
            props.onChange((e.target.value: string));
        }}>
        {props.assets.map(option => (
            <option
                selected={option === props.selected}
                onClick={(e)=>{
                    e.preventDefault();
                }}
                value={option}
            >{option}</option>))}
    </Select></SelectionField>
};

const NodeShapeSelection = (props) => {

    return <SelectionField>
        <Label for="node-shape">shape</Label>
        <Select name="node-shape" onChange={(e) => {props.onChange((e.target.value:string));}}>
        {nodeShapes.map(option => <option
            selected={option === props.selected}
            value={option}>{option}</option>)}
    </Select>
    </SelectionField>
};

const NodeColorSelection = (props) => {

    return<SelectionField>
            <Label for="node-color">color</Label>
    <Select name="node-color" onChange={(e) => {props.onChange((e.target.value:string));}}>
        {colorOptions.map(option => <option
            selected={option === props.selected}
            value={option}>{option}</option>)}
    </Select>
    </SelectionField>
};

