import React from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import * as detailEditorActions from '../detail-editor.actions';
import SelectionWithFilterAndCreate from './SelectionWithFilterAndCreate';
import { SelectionProps } from './SelectionWithFilterAndCreate';
import {TAG} from "../../../constants";


const TagSelection = (props: SelectionProps) => (
    <SelectionWithFilterAndCreate {...props}/>
);

const mapStateToProps = (state, props) => {

    const options = state.tags.map(tag => tag.name);
    const selected = state.detailForm.selectedTags;
    const notSelected = options.filter(option => !_.includes(selected, option));

    return {
        title: props.title,
        options: notSelected,
        selected: selected
    }
};

const mapDispatchToProps = dispatch => {
    return {
        select: (value:string) => dispatch(detailEditorActions.addTagToSelected((value:string))),
        deselect: (value:string) => dispatch(detailEditorActions.removeTagFromSelected((value:string))),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TagSelection);