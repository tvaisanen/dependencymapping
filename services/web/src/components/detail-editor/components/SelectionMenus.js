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
    onNodeShapeSelection: (value:string) => void
}

const SelectionMenus = (props: SelectionMenusProps) => (
    props.formType === ASSET ?
        <Container>
            <NodeGroupSelection
                onChange={props.onAssetGroupSelection}
                assets={props.assets}/>
            <NodeShapeSelection onChange={props.onNodeShapeSelection}/>
            <NodeColorSelection onChange={props.onNodeColorSelection}/>
        </Container>
        : null
);

const mapStateToProps = (state, props) => ({
    assets: ["none", ...state.assets.map(asset=>asset.name)],
    formType: state.detailForm.formType
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
        onChange={(e) => {props.onChange((e.target.value: string));}}>
        {props.assets.map(option => (<option value={option}>{option}</option>))}
    </Select>
};

const NodeShapeSelection = (props) => {

    return <Select onChange={(e) => {props.onChange((e.target.value:string));}}>
        {nodeShapes.map(option => <option value={option}>{option}</option>)}
    </Select>
};

const NodeColorSelection = (props) => {
    return <Select onChange={(e) => {props.onChange((e.target.value:string));}}>
        {colorOptions.map(option => <option value={option}>{option}</option>)}
    </Select>
};

