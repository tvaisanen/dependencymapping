// Mappingform

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as form from './form.components';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/graphActions';
import {mappingExists} from '../../common/resource-helpers';
import {getSelected, selectOptionsInList} from './form.helpers';
import * as parser from '../../common/parser';
import * as validators from '../../common/validators';
import * as types from '../../constants/types';

class MappingForm extends Component {
    constructor(props) {
        super(props);
        this.onSave = this.onSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.state = {
            name: "",
            description: "",
            resources: [],
            categories: [],
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
            if (this.props.detail.categories) {
                const categoryNameList = this.props.detail.categories.map(
                    c => c.name
                );
                const categoryOptions = this.inputCategories.options;
                selectOptionsInList({
                    list: categoryNameList,
                    options: categoryOptions
                });
            }
        }
    }

    areArgumentsValid() {
        const nameValid = validators.validMappingName(this.state.name);
        const descriptionValid = validators.validDescription(this.state.description);
        return nameValid && descriptionValid;
    }

    onSave() {
        if (this.areArgumentsValid()) {

            // get form values
            const name = this.state.name;
            const description = this.state.description;
            const resourceIds = getSelected(this.inputResources.options);

            const resources = parser.filterResourcesByIds({
                ids: resourceIds,
                resources: this.props.resources
            });


            /** todo:
             *      make so that, the final implementation deals with
             *      id strings instead of complete objects.
             */

                //const resourceIdList = resources.map(r => r.name);
            const tags = getSelected(this.inputTags.options);
            const nameReserved = mappingExists({id: name, mappings: this.props.mappings});

            const mapping = {name, description, resources, tags};

            if (nameReserved || this.props.edit) {
                // notify user that the name is reserved.
                // ask if it should be replaced!
                console.info(`this.props.updateMapping("${this.state.name}")`);
                const responsePromise = this.props.updateMapping(mapping);
                responsePromise.then(response => {
                    console.info(response);
                    console.info("Todo: update cy graph view with updated resources")
                })

            } else {
                const responsePromise = this.props.postMapping(mapping);   // handle post

                responsePromise.then(response => {
                    // return data to caller
                    console.info("response.then")
                    console.info(response);
                    if (response.status === 201) {
                        alert(response.data.name + " created successfully!");
                        this.props.setDetail({
                            detail: response.data.name,
                            type: types.MAPPING
                        }); // set detail for new mapping
                        this.props.setView(0);
                        this.props.cancel(); // close the form
                    }
                })
                    .catch(error => {
                        // return error response to caller
                        console.info('response catch')
                        console.info(error);
                        return error.response;

                        // set view back tho browsing
                        // this.props.setView(0);
                    });
            }
        }
        // if mapping stored successfully return to browse view

        else {
            this.toggleValidation();
        }
    }

    onDelete({name}) {
        const userReallyWantsToDelete = window.confirm("Do you really want to delete " + name + "?");
        if (userReallyWantsToDelete) {
            const responsePromise = this.props.deleteMapping({name});
            responsePromise.then(response => {
                    console.info(response);
                    if (response.status === 204) {
                        alert('delete')
                        this.props.setDetail({
                            detail: "EMPTY",
                            type: types.MAPPING
                        }); // set detail for new mapping
                        this.props.setView(0);
                        this.props.cancel(); // close the form
                    } else {
                        alert(response.status);
                        console.warn(response);
                    }
                }
            )
        }
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
                    check={() => this.setState({check: true})} // debugging
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

export default connect(mapStateToProps, mapDispatchToProps)

(
    MappingForm
)
;

