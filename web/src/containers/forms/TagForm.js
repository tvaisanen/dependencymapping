import React from 'react';
import PropTypes from 'prop-types';
import * as form from './form.components';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/index';
import * as validators from '../../common/validators';
import BaseForm from './BaseForm';
import * as types from '../../constants/types';

import {tagExists} from '../../common/resource-helpers';

class TagForm extends BaseForm {
    constructor(props) {
        super(props);
        this.state = {
            type: types.TAG,
            selections: false
        };
    }

    exists({id, set}){
        return tagExists({id: id, tags: set});
    }

    actionPost(form){
        return this.props.postTag(form);
    }

    actionUpdate(form){
        return this.props.updateTag(form);
    }

    actionDelete({name}) {
        return this.props.deleteTag({name});
    }


    render() {

        const nameValid = validators.validMappingName(this.state.name);
        const descriptionValid = validators.validDescription(this.state.description);

        return (
            <form.Container column>
                <form.Container row id="form-col-one">
                    <form.Container column>
                        <form.Label>Name</form.Label>
                        <form.Input
                            value={this.state.name}
                            valid={nameValid}
                            check={this.state.check}
                            onChange={(e) =>
                                this.setState({name: e.target.value})
                            }
                        />
                        <form.Label>Description</form.Label>
                        <form.TextArea rows="9"
                                       value={this.state.description}
                                       valid={descriptionValid}
                                       check={this.state.check}
                                       onChange={(e) =>
                                           this.setState({description: e.target.value})
                                       }
                        />
                    </form.Container>

                </form.Container>
                <form.ButtonRow
                    edit={this.props.edit}
                    remove={() => this.onDelete({name: this.state.name})}
                    save={this.onSave}
                    cancel={this.props.cancel}/>
            </form.Container>
        );
    }
}

TagForm.propTypes = {
    postTag: PropTypes.func.isRequired,
    updateTag: PropTypes.func.isRequired,
    deleteTag: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps = {}) => {
    return {
        resources: state.resources,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({...actionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TagForm);

