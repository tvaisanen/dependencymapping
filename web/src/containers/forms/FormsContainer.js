import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as l from '../../components/layout';
import * as f from './form.components';
import TagForm from './TagForm';
import ResourceForm from './ResourceForm';
import MappingForm from './MappingForm';

export const SelectForm = ({openForm}) => <l.LayoutCol id="form-selection-container">
    <h2>Create new</h2>
    <f.FormSelectionItems id="form-selection-items">
        <f.FormSelection id="form-selection-item"
            onClick={() => openForm({ viewId: 1 })}
            >Mapping
        </f.FormSelection>
        <f.FormSelection id="form-selection-item"
            onClick={() => openForm({ viewId: 2 })}
            >Resource
        </f.FormSelection>
        <f.FormSelection id="form-selection-item"
            onClick={() => openForm({ viewId: 3 })}
        >Category</f.FormSelection>
    </f.FormSelectionItems>
</l.LayoutCol>;

class FormsContainer extends Component {

    constructor(props){
        super(props);
        this.state  = {
            view: 0
        }    

        this.openForm = this.openForm.bind(this);  
        this.cancelForm = this.cancelForm.bind(this);

        this.formViews = [
            {component: SelectForm, props: {id: 0, openForm: this.openForm, cancel: this.cancelForm}},
            {component: MappingForm, props: {id: 1, onClick: this.openForm, cancel: this.cancelForm, setView: this.props.setView}},
            {component: ResourceForm, props: {id: 2, onClick: this.openForm, cancel: this.cancelForm}},
            {component: TagForm, props: {id: 3, onClick: this.openForm, cancel: this.cancelForm}}
        ];

    }
    
    openForm({viewId}){
        this.setState({view: viewId})
    }

    cancelForm(){
        // set view to form selection
        this.setState({view: 0});
    }

    render() { 
        const view = this.formViews[this.state.view];
        return (
            <l.BottomPanelContent>
                <view.component {...view.props}/>
            </l.BottomPanelContent> 
        );
    }
}

FormsContainer.propTypes = {
    setView: PropTypes.func.isRequired,
};

export default FormsContainer;