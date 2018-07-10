// Mappingform

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as form from './form.components';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/graphActions';
import { mappingExists } from '../../common/resource-helpers';
import { getSelected, selectOptionsInList } from './form.helpers';
import _ from 'lodash';
import * as parser from '../../common/parser';
import * as validators from '../../common/validators';

class MappingForm extends Component {
    constructor(props){
        super(props);
        this.onSave = this.onSave.bind(this);
        this.state = {
            name: "",
            description: "",
            resources: [],
            categories: [],
        }
    }

    componentDidMount(){
        if (this.props.edit){
            // if form is opened to edit a resource 
            // map the resource properties to starting values
            this.setState({
                name: this.props.detail.name,
                description: this.props.detail.description
            })
            const resourceNameList = this.props.detail.resources.map(
                r => r.name
            )
            const categoryNameList = this.props.detail.categories.map(
                c => c.name
            )

            const resourceOptions = this.inputResources.options;
            selectOptionsInList({
                list: resourceNameList, 
                options: resourceOptions
            })

            const categoryOptions = this.inputCategories.options;
            selectOptionsInList({
                list: categoryNameList,
                options: categoryOptions
            })
        }
    }

    areArgumentsValid(){
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

            console.info("resources: ");
            console.info(resources);

            /** todo:
             *      make so that, the final implementation deals with
             *      id strings instead of complete objects.
             */

            const resourceIdList = resources.map(r => r.name);
            const categories = getSelected(this.inputCategories.options);
            const nameReserved = mappingExists({id: name, mappings: this.props.mappings});

            if (nameReserved) {
                // notify user that the name is reserved.
                // ask if it should be replaced!
                console.log('map exists.. update');
            } else {

                // if response is error do something
                const response = this.props.postMapping({
                    name,
                    description,
                    resources,
                    categories
                });
                    response.then(r => {
                        // return data to caller
                        console.info("response.then")
                        console.info(r);
                    })
                    .catch(error => {
                        // return error response to caller
                        console.info('response catch')
                        console.info(error);
                        return error.response;
                    });


                // set view back tho browsing
                // this.props.setView(0);
            }

            // if mapping stored successfully return to browse view
        }
        else {
            this.toggleValidation();
        }
    }

    toggleValidation(){
        this.setState({check: true});
    }

    render() {
        const categoryNameList = this.props.categories.map( c => c.name );
        const resourceNameList = this.props.resources.map( r => r.name );
        const mapping = this.props.detail
        const { edit } = this.props;
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
                        <form.Container id="form-col-two" column>
                            {/* Selectable resource list */}
                            <form.Label>Resources</form.Label>
                            <form.SelectionList multiple innerRef={ref => this.inputResources = ref}>
                                {resourceNameList.map((r, i) => <option key={i}>{r}</option>)}
                             </form.SelectionList>

                        </form.Container>
                        <form.Container id="form-col-three" column>
                             <form.Label>Categories</form.Label>
                            <form.SelectionList multiple innerRef={ref => this.inputCategories = ref}>
                                {categoryNameList.map((c,i) => <option key={i}>{c}</option>)}
                             </form.SelectionList>                          
                        </form.Container>

            </form.Container>
                <form.ButtonRow
                    check={()=>this.setState({check: true})} // debugging
                    save={this.onSave}
                    cancel={this.props.cancel}/>

            </form.Container>
        );
    }
}

MappingForm.propTypes = {
    detail: PropTypes.object,
    cancel: PropTypes.func.isRequired,
    setView: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps = {}) => {
  return  {
    resources: state.resources,
    categories: state.categories,
    mappings: state.graphs
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...actionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MappingForm);

