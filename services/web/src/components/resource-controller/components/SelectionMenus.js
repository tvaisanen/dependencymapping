//@flow
import React from 'react';
import {ASSET} from '../../../constants/types';
import {connect} from 'react-redux'
import styled from 'styled-components';
import {nodeShapes, colorOptions} from "../../../configs/configs.cytoscape";

type SelectionMenusProps = {
    formType: string,
    assets: Array<String>,
    setValue: (object) => void
}

const SelectionMenus = (props: SelectionMenusProps) => (
    props.formType === ASSET ?
        <Container>
            <NodeGroupSelection
                setValue={props.setValue}
                assets={props.assets}/>
            <NodeShapeSelection
                setValue={props.setValue}/>
            <NodeColorSelection
                setValue={props.setValue}/>
        </Container>
        : null
);

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = (dispatch) => ({});

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
    return <Select onChange={(e) => props.setValue({parent: e.target.value})}>
        {props.assets.map(option => (
            <option
                onSelect={(e) => alert(e.target.value)}
                value={option}>{option}</option>)
        )}
    </Select>
}

const NodeShapeSelection = (props) => {

    return <Select onChange={(e) => props.setValue({shape: e.target.value})}>
        {nodeShapes.map(option => <option value={option}>{option}</option>)}
    </Select>
};

const NodeColorSelection = (props) => {
    return <Select onChange={(e) => props.setValue({color: e.target.value})}>
        {colorOptions.map(option => <option value={option}>{option}</option>)}
    </Select>
};

