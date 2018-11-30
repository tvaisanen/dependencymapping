//@flow
import React from 'react';
import {ASSET} from '../../../constants/types';
import {connect} from 'react-redux'
import styled from 'styled-components';
import {nodeShapes, colorOptions} from "../../../configs/configs.cytoscape";
import * as detailEditorActions from '../../detail-editor/detail-editor.actions'


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
                setValue={props.setValue}
                assets={props.assets}/>
            <NodeShapeSelection
                onChange={props.onNodeShapeSelection}
                setValue={props.setValue}/>
            <NodeColorSelection
                onChange={props.onNodeColorSelection}
                setValue={props.setValue}/>
        </Container>
        : null
);

const mapStateToProps = (state, props) => ({});

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
  padding: 12px 0;
`;


const Select = styled.select`
  flex-grow: 1;
`;

const NodeGroupSelection = (props) => {
    console.info(props)
    return <Select onChange={(e) => {
        props.onChange((e.target.value: string));
        props.setValue({parent: e.target.value})
    }}>
        {props.assets.map(option => (
            <option
                onSelect={(e) => alert(e.target.value)}
                value={option}>{option}</option>)
        )}
    </Select>
}

const NodeShapeSelection = (props) => {

    return <Select onChange={(e) => {
        props.onChange((e.target.value:string));
        props.setValue({shape: e.target.value})
    }}>
        {nodeShapes.map(option => <option value={option}>{option}</option>)}
    </Select>
};

const NodeColorSelection = (props) => {
    return <Select onChange={(e) => {
        props.onChange((e.target.value:string));
        props.setValue({color: e.target.value})
    }}>
        {colorOptions.map(option => <option value={option}>{option}</option>)}
    </Select>
};

