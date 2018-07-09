import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as form from './form.components';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/graphActions';
import { getSelected } from './form.helpers';

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
        return (
            <form.Container column>
                    <form.Container row id="form-col-one">
                        <form.Container column >
                            <form.Label>Name</form.Label>
                            <form.Input 
                                value={this.state.name}
                                onChange={e => this.setState({name: e.target.value})}
                            />
                            <form.Label>Description</form.Label>
                            <form.TextArea rows="9" 
                                value={this.state.description}
                                onChange={(e) => this.setState({description: e.target.value})}
                            /> 
                        </form.Container>
                        <form.Container id="form-col-two" column>
                            {/* Selectable resource list */}
                            <form.Label>Related to</form.Label>
                            <form.SelectionList multiple innerRef={ref => this.inputResources = ref}>
                                {resourceNameList.map(r => <option>{r}</option>)}
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

