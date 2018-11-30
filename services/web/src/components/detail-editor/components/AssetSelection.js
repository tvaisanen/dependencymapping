import React from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import SelectionWithFilterAndCreate from './SelectionWithFilterAndCreate';
import * as detailEditorActions from '../detail-editor.actions';

export const AssetSelection = (props: Props) => {
    console.info(props)

    return (
        <SelectionWithFilterAndCreate {...props}/>
    );
}

const mapStateToProps = (state, props) => {

    const options = state.assets.map(asset => asset.name);
    const selected = state.detailForm.selectedAssets;
    const notSelected = options.filter(option => !_.includes(selected, option));

    return {
        resourceType: props.resourceType,
        title: props.title,
        options: notSelected,
        selected: selected
    };
}

const mapDispatchToProps = dispatch => {
    return {
        select: (value:string) => dispatch(detailEditorActions.addAssetToSelected((value:string))),
        deselect: (value:string) => dispatch(detailEditorActions.removeAssetFromSelected((value:string))),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AssetSelection);
