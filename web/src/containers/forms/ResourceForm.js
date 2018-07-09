import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as form from './form.components';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/graphActions';
import { getSelected } from './form.helpers';
import * as validators from '../../common/validators';


class MappingForm extends Component {
    constructor(props){
        super(props);
        this.onSave = this.onSave.bind(this);
        this.state = {
            name: "",
            description: ""
        }
    }

    componentDidMount(){
        if (this.props.edit){
            this.setState({
                name: this.props.detail.name,
                description: this.props.description,
            })
        }
        
    }

    toggleValidation(){
        this.setState({check: true});
    }

    onSave() {
        const name = this.inputName.value;
        const description = this.inputDescription.value;
        const options = this.inputResources.options;
        const resources = getSelected(this.inputResources.options);
        const categories = getSelected()
        this.props.postResource({name, description, connected_to: resources});
    }

    render() {

        const categoryNameList = this.props.categories.map( c => c.name );
        const resourceNameList = this.props.resources.map( r => r.name );
        const nameValid = validators.validMappingName(this.state.name);
        const descriptionValid = validators.validDescription(this.state.description);
        return (
            <form.Container column>
                    <form.Container row id="form-col-one">
                        <form.Container column >

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
                            <form.SelectionList multiple innerRef={ref => this.inputResources = ref}>
                                {resourceNameList.map((r,i) => <option key={i}>{r}</option>)}
                             </form.SelectionList>

                        </form.Container>
                        <form.Container id="form-col-three" column>
                             <form.Label>Categories</form.Label>
                            <form.SelectionList multiple innerRef={ref => this.inputCategories = ref}>
                                {categoryNameList.map((c,i) => <option key={i}>{c}</option>)}
                             </form.SelectionList>                          
                        </form.Container>


            </form.Container>
                <form.ButtonBox>           
                <form.Button
                    onClick={this.props.cancel}>
                    cancel
                </form.Button>
                <form.Button onClick={this.onSave}>save</form.Button>
                    <form.Button onClick={()=>this.setState({check: true})}>
                        check</form.Button>
                </form.ButtonBox>
                    </form.Container>
        );
    }
}

MappingForm.propTypes = {

};
const mapStateToProps = (state, ownProps = {}) => {
  return  {
    resources: state.resources,
    categories: state.categories
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...actionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MappingForm);

