import React from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import { ASSET} from "../../../constants";
import SelectionWithFilterAndCreate from './SelectionWithFilterAndCreate';
import * as detailEditorActions from '../detail-editor.actions';
import type {Dispatch, State} from "../../../store/types";
import GwClientApi from "../../../api/gwClientApi";
import * as assetActions from '../../../store/asset/asset.actions';

export const AssetSelection = (props: Props) => <SelectionWithFilterAndCreate {...props}/>;

const mapStateToProps = (state, props) => {

    const { assetFilter } = state.detailForm;
    const options = state.assets.map(asset => asset.name);
    const selected = state.detailForm.selectedAssets;
    const notSelected = options.filter(option => !_.includes(selected, option));

    const filteredAvailableSelections = notSelected.filter(option => (
        option.toLowerCase(option)).includes(assetFilter.toLowerCase())
    );
    return {
        selectedLabel: state.detailForm.formType === ASSET ? "connected to" : "assets",
        filterValue: state.detailForm.assetFilter,
        resourceType: state.detailForm.formType,
        title: "Assets",
        options: filteredAvailableSelections,
        selected: selected
    };
}

const mapDispatchToProps = dispatch => {
    return {
        select: (value:string) => dispatch(detailEditorActions.addAssetToSelected((value:string))),
        deselect: (value:string) => dispatch(detailEditorActions.removeAssetFromSelected((value:string))),
        createAndSelect: (name:string) => dispatch(createAndSelect((name:string))),
        onFilterChange: (value:string) => dispatch(detailEditorActions.onAssetFilterChange((value:string)))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AssetSelection);

function createAndSelect(name: string): Dispatch {

    return function (dispatch: Dispatch, getState: State): void {
        const { detailForm: {selectedAssets}, assets } = getState();
        const assetNameList = assets.map(asset => asset.name);
        if (_.includes(assetNameList, name)) {
            // if tag already exists, just add the tag to selected
            // but do not allow duplicates
            if (!_.includes(selectedAssets, name)) {
                dispatch(detailEditorActions.addAssetToSelected((name:string)));
            }

        } else {
            // create the tag and add it to selected
            const promise = GwClientApi.postAsset({name: name});
            promise.then(response => {
                console.info(response.data)
                dispatch(assetActions.postAssetSuccess(response.data));
                dispatch(detailEditorActions.addAssetToSelected((name:string)));
            });
        }

    }
}
