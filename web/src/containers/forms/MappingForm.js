// Mappingform

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as form from './form.components';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/index';
import {mappingExists} from '../../common/resource-helpers';
import * as validators from '../../common/validators';
import BaseForm from './BaseForm';
import * as types from '../../constants/types';

class MappingForm extends BaseForm {
    constructor(props){
        super(props);
        this.setState({
            type: types.MAPPING
        });
    }

   exists({id, set}){
       return mappingExists({id: id, mappings: set});
   }

    actionDelete({name}) {
        console.info("actionDeleteMapping("+name+")");
        return this.props.deleteMapping({name});
    }

    actionPost(mapping){
        return this.props.postMapping(mapping);
    }

    actionUpdate(mapping){
        return this.props.updateMapping(mapping);
    }

    toggleValidation() {
        this.setState({check: true});
    }

    render() {
        const tagNameList = this.props.tags.map(c => c.name);
        const resourceNameList = this.props.resources.map(r => r.name);
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
                        {this.state.error.name ?
                            <form.ErrorMsg>{this.state.error.name}</form.ErrorMsg>
                            : null
                        }

                        <form.Label>Description</form.Label>
                        <form.TextArea
                            rows="9"
                            value={this.state.description}
                            valid={descriptionValid}
                            check={this.state.check}
                            onChange={(e) =>
                                this.setState({description: e.target.value})
                            }
                        />

                    </form.Container>
                    <form.Container id="form-col-two" column>
                        {/* Selectable resource list */}
                        <form.Label>Resources</form.Label>
                        <form.SelectionList multiple innerRef={ref => this.inputResources = ref}>
                            {resourceNameList.map((r, i) => <option key={i}>{r}</option>)}
                        </form.SelectionList>

                    </form.Container>
                    <form.Container id="form-col-three" column>
                        <form.Label>Tags</form.Label>
                        <form.SelectionList multiple innerRef={ref => this.inputTags = ref}>
                            {tagNameList.map((c, i) => <option key={i}>{c}</option>)}
                        </form.SelectionList>
                    </form.Container>

                </form.Container>
                <form.ButtonRow
                    edit={this.props.edit}
                    save={this.onSave}
                    remove={() => this.onDelete({name: this.state.name})}
                    cancel={this.props.cancel}/>

            </form.Container>
        );
    }
}

MappingForm.propTypes = {
    updateMapping: PropTypes.func.isRequired,
    detail: PropTypes.object,
    cancel: PropTypes.func.isRequired,
    setView: PropTypes.func.isRequired
};

const
    mapStateToProps = (state, ownProps = {}) => {
        return {
            resources: state.resources,
            tags: state.tags,
            mappings: state.graphs
        }
    }

function mapDispatchToProps(dispatch) {
    return bindActionCreators({...actionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MappingForm);

