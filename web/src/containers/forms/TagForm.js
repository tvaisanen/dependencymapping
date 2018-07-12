import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as form from './form.components';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/graphActions';
import * as validators from '../../common/validators';


class TagForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            check: false,
        };

        this.onSave = this.onSave.bind(this);
    }

    componentDidMount() {
        if (this.props.edit) {
            // if form is opened to edit a resource
            // map the resource properties to starting values
            this.setState({
                name: this.props.detail.name,
                description: this.props.detail.description
            });
        }
    }

    onSave() {
        if (this.areArgumentsValid()) {
            const name = this.state.name;
            const description = this.state.description;

            this.props.postTag({name, description});
        } else {
            this.toggleValidation();
        }
    }

    toggleValidation() {
        this.setState({check: true});
    }

    areArgumentsValid() {
        const nameValid = validators.validMappingName(this.state.name);
        const descriptionValid = validators.validDescription(this.state.description);
        return nameValid && descriptionValid;
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
                    check={() => this.setState({check: true})} // debugging
                    save={this.onSave}
                    cancel={this.props.cancel}/>
            </form.Container>
        );
    }
}

TagForm.propTypes = {
    postTag: PropTypes.func.isRequired
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

