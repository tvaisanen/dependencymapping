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
  width: 100%;
  min-height: 1.2em;
`;


const Select = styled.select`
  flex-grow: 1;
`;


const NodeGroupSelection = (props) => {
    return <Select
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
    </Select>
};

const NodeShapeSelection = (props) => {

    return <Select onChange={(e) => {props.onChange((e.target.value:string));}}>
        {nodeShapes.map(option => <option
            selected={option === props.selected}
            value={option}>{option}</option>)}
    </Select>
};

const NodeColorSelection = (props) => {
    return <Select onChange={(e) => {props.onChange((e.target.value:string));}}>
        {colorOptions.map(option => <option
            selected={option === props.selected}
            value={option}>{option}</option>)}
    </Select>
};

