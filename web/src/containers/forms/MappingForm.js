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

    onSave() {
        const name = this.state.name;
        const description = this.state.description;
        const options = this.inputResources.options;
        const resourceIds = getSelected(this.inputResources.options);
        const resources = parser.filterResourcesByIds({
            ids: resourceIds,
            resources: this.props.resources
        });
        const resourceIdList = resources.map(r => r.name);
        const categories = getSelected(this.inputCategories.options);
        // if editing
        console.log(this.props.mappings);
        console.log(mappingExists({id: name, mappings: this.props.mappings}))
        if (mappingExists({id: name, mappings: this.props.mappings})){
            console.log('map exists.. update');
        } else {

    

        const response = this.props.postMapping({
            name, description, resources, categories});
        response.then(r => console.info(r));
        }
    }

    render() {

        const categoryNameList = this.props.categories.map( c => c.name );
        const resourceNameList = this.props.resources.map( r => r.name );
        const mapping = this.props.detail
        const { edit } = this.props;
        console.debug(this.props);  
        return (
            <form.Container column>
                    <form.Container row id="form-col-one">
                        <form.Container column>
                            <form.Label>Name</form.Label>
                            <form.Input 
                                value={this.state.name}
                                onChange={(e) =>
                                    this.setState({name: e.target.value})
                                }
                            />

                            <form.Label>Description</form.Label>
                            <form.TextArea rows="9" 
                                value={this.state.description} 
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

            <form.Container row>
                {/* Row for buttons*/}
                <form.ButtonBox>           
                    <form.Button 
                        onClick={this.props.cancel}>
                        cancel
                    </form.Button>
                    <form.Button 
                        onClick={this.onSave}>
                        save
                    </form.Button>
                </form.ButtonBox>
 
            </form.Container>
            </form.Container>
        );
    }
}

MappingForm.propTypes = {
    detail: PropTypes.object,
    cancelForm: PropTypes.func.isRequired
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

