import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as form from './form.components';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/graphActions';
import * as validators from '../../common/validators';
import {getSelected, selectOptionsInList} from './form.helpers';


class MappingForm extends Component {
    constructor(props) {
        super(props);
        this.onSave = this.onSave.bind(this);
        this.state = {
            name: "",
            description: ""
        }
    }

    componentDidMount() {
        if (this.props.edit) {
            // if form is opened to edit a resource
            // map the resource properties to starting values
            this.setState({
                name: this.props.detail.name,
                description: this.props.detail.description
            });


            // if mapping has resources map the selection
            if (this.props.detail.resources) {
                const resourceNameList = this.props.detail.resources.map(
                    r => r.name
                );
                const resourceOptions = this.inputResources.options;
                selectOptionsInList({
                    list: resourceNameList,
                    options: resourceOptions
                });
            }

            // if mapping has categories map the selection
            if (this.props.detail.tags) {
                const tagNameList = this.props.detail.tags.map(
                    t => t.name
                );
                const tagOptions = this.inputTags.options;
                selectOptionsInList({
                    list: tagNameList,
                    options: tagOptions
                });
            }
        }
    }

    toggleValidation() {
        // show the validity of inputs
        this.setState({check: true});
    }

    areArgumentsValid() {
        const nameValid = validators.validMappingName(this.state.name);
        const descriptionValid = validators.validDescription(this.state.description);
        return nameValid && descriptionValid;
    }


    onSave() {
        if (this.areArgumentsValid()) {
            const name = this.state.name;
            const description = this.state.description;
            const resources = getSelected(this.inputResources.options);
            const tags = getSelected(this.inputTags.options);
            this.props.postResource({name, description, connected_to: resources, tags});
        } else {
            this.toggleValidation() // if not ok
        }
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
                        <form.Label>Related to</form.Label>
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
                    check={() => this.setState({check: true})} // debugging
                    save={this.onSave}
                    cancel={this.props.cancel}/>
            </form.Container>
        );
    }
}

MappingForm.propTypes = {
    cancel: PropTypes.func.isRequired,

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

export default connect(mapStateToProps, mapDispatchToProps)(MappingForm);

