//@flow
import React from 'react';
import {ASSET} from '../../../constants/types';
import {connect} from 'react-redux'
import styled from 'styled-components';
import {nodeShapes, colorOptions} from "../../../configs/configs.cytoscape";
import * as detailEditorActions from '../detail-editor.actions'


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
        <Container>
            <NodeGroupSelection
                selected={props.group}
                onChange={props.onAssetGroupSelection}
                assets={props.assets}/>
            <NodeShapeSelection
                selected={props.nodeShape}
                onChange={props.onNodeShapeSelection}/>
            <NodeColorSelection
                selected={props.nodeColor}
                onChange={props.onNodeColorSelection}/>
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
  flex-wrap: wrap;
  width: 100%;
  padding: 0 0 12px 0;
  min-height: 2.2em;
  justify-content: center;
  > div {
    margin: 0 12px;
    }
`;


const Select = styled.select`
    flex-basis: inherit;
`;


const NodeGroupSelection = (props) => {
    return <div>
        <small>
            <label for="node-group">group</label><br/>
        </small>
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
                    alert('here')
                }}
                value={option}
            >{option}</option>))}
    </Select></div>
};

const NodeShapeSelection = (props) => {

    return <div>
        <small>
        <label for="node-shape">node shape</label><br/>
        </small>
        <Select name="node-shape" onChange={(e) => {props.onChange((e.target.value:string));}}>
        {nodeShapes.map(option => <option
            selected={option === props.selected}
            value={option}>{option}</option>)}
    </Select>
    </div>
};

const NodeColorSelection = (props) => {

    return<div>
        <small>
            <label for="node-color">node color</label><br/>
        </small>
    <Select name="node-color" onChange={(e) => {props.onChange((e.target.value:string));}}>
        {colorOptions.map(option => <option
            selected={option === props.selected}
            value={option}>{option}</option>)}
    </Select>
    </div>
};

