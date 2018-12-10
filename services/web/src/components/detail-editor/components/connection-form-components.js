import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import TagSelection from "./TagSelection";
import DescriptionTextarea from "./DescriptionTextarea";

export const ConnectionSelections = () => (
    <React.Fragment>
       <TagSelection/>
    </React.Fragment>
);

const SelectRow = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;

const Select = styled.select`
    padding: 4px;
    margin: 6px;
`;

export const ConnectionForm = (props) => (
     <React.Fragment>
            <SelectRow>
                <SelectSourceAsset
                    label={"source"}
                    onChange={(selected) => alert(`selected: ${selected}`)}
                    selected={props.source}
                    {...props}/>
                <SelectTargetAsset

                    label={"target"}
                    selected={props.target}
                    onChange={(selected) => alert(`selected: ${selected}`)}
                    {...props}/>
            </SelectRow>
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

function mapStateToProps (state, props) {
    return {
        edit: state.detailForm.edit,
        assets: state.assets.map(asset => asset.name),
        source: state.detailForm.source,
        target: state.detailForm.target,
    }
}

export default connect(
    mapStateToProps
    ,{}
)(ConnectionForm);


const SelectAsset = (props) => {
    return <div>
        <small>
            <label for={`${props.label}-asset`}>{props.label}</label><br/>
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
