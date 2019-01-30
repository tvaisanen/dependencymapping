import React from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import {addTagToSelected, onTagFilterChange, removeTagFromSelected} from '../detail-editor.actions';
import SelectionWithFilterAndCreate from './SelectionWithFilterAndCreate';
import { SelectionProps } from './SelectionWithFilterAndCreate';
import {TAG} from "../../../constants";
import type {Dispatch, State} from "../../../store/types";
import GwClientApi from "../../../api/gwClientApi";
import * as tagActions from '../../../store/tag/tag.actions';


const TagSelection = (props: SelectionProps) => (
    <SelectionWithFilterAndCreate {...props}/>
);

const mapStateToProps = (state, props) => {

    const { tagFilter } = state.detailForm;
    const options = state.tags.map(tag => tag.name);
    const selected = state.detailForm.selectedTags;
    const notSelected = options.filter(option => !_.includes(selected, option));

    const filteredAvailableSelections = notSelected.filter(option => (
        option.toLowerCase(option)).includes(tagFilter.toLowerCase())
    );
    return {
        filterValue: state.detailForm.tagFilter,
        title: "Tags",
        selectedLabel: "tags",
        options: filteredAvailableSelections,
        selected: selected
    }
};

const mapDispatchToProps = dispatch => {
    return {
        select:             (value:string) => dispatch(addTagToSelected((value:string))),
        deselect:           (value:string) => dispatch(removeTagFromSelected((value:string))),
        createAndSelect:    (name:string)  => dispatch(createAndSelect((name:string))),
        onFilterChange:     (value:string) => dispatch(onTagFilterChange((value:string)))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TagSelection);

function createAndSelect(tagName): Dispatch {

    return function (dispatch: Dispatch, getState: State): void {
        const { detailForm: {selectedTags} , tags } = getState();
        const tagNameList = tags.map(tag => tag.name);
        if (_.includes(tagNameList, tagName)) {
            // if tag already exists, just add the tag to selected
            // but do not allow duplicates
            if (!_.includes(selectedTags, tagName)) {
                dispatch(addTagToSelected((tagName: string)));
            }

        } else {
            // create the tag and add it to selected
            const promise = GwClientApi.postTag({name: tagName});
            promise.then(response => {
                console.info(response.data)
                dispatch(tagActions.postTagSuccess(response.data));
                dispatch(addTagToSelected((tagName: string)));
            });
        }

    }
}