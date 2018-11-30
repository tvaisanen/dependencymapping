import React from 'react';
import { connect } from 'react-redux';
import * as detailEditorActions from '../detail-editor.actions';

const DescriptionTextarea = (props) => {
    return (
        <div>
            <label> description</label>
            <textarea
                rows="12"
                value={props.description}
                valid={true}
                onChange={(e) => {
                    props.onChange(e.target.value);
                }}/>
        </div>
    )
};

const mapStateToProps = (state, props) => ({
    description: state.detailForm.description
});

const mapDispatchToProps= (dispatch) => ({
    onChange: (value: string) => dispatch(detailEditorActions.onResourceDescriptionChange((value:string)))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DescriptionTextarea);