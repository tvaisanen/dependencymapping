import React from 'react';
import PropTypes from 'prop-types';
import BaseForm from './BaseForm';
import * as form from './form.components';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/index';
import * as validators from '../../common/validators';
import {resourceExists} from '../../common/resource-helpers';
import * as types from '../../constants/types';

class ResourceForm extends BaseForm {

    constructor(props){
        super(props);
        this.setState({
            type: types.ASSET
        });
    }

    exists({id, set}){
        return resourceExists({id, resources: set});
    }

    actionPost(form){
        console.info("post resrouce");
        console.info(form);
        console.info({
            ...form, connected_to: form.resources

        });
        return this.props.postResource({
            ...form, connected_to: form.resources

        });
    }

    actionUpdate(form){
        return this.props.updateResource({
            ...form, connected_to: form.resources
        });
    }

    actionDelete({name}){
        return this.props.deleteResource({name})
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
                            valid={nameValid}
                            check={this.state.check}
                            value={this.state.name}
                            onChange={e => this.setState({name: e.target.value})}
                        />
                        <form.Label>Description</form.Label>
                        <form.TextArea rows="9"
                                       valid={descriptionValid}
                                       check={this.state.check}
                                       value={this.state.description}
                                       onChange={(e) => this.setState({description: e.target.value})}
                        />
                    </form.Container>
                    <form.Container id="form-col-two" column>
                        {/* Selectable resource list */}
                        <form.Label>connected / dependency</form.Label>
                        <form.SelectionList multiple
                                            innerRef={ref => this.inputResources = ref}>
                            {resourceNameList.map((r, i) => <option key={i}>{r}</option>)}
                        </form.SelectionList>

                    </form.Container>
                    <form.Container id="form-col-three" column>
                        <form.Label>Tags</form.Label>
                        <form.SelectionList multiple innerRef={ref => this.inputTags = ref}>
                            {tagNameList.map((t, i) => <option key={i}>{t}</option>)}
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

ResourceForm.propTypes = {
    cancel: PropTypes.func.isRequired,
    tags: PropTypes.array.isRequired,
    updateResource: PropTypes.func.isRequired

};

const mapStateToProps = (state, ownProps = {}) => {
    return {
        resources: state.resources,
        tags: state.tags
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({...actionCreators}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(ResourceForm);


