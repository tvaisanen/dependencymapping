import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as l from '../../components/layout';
import * as f from './form.components';
import CategoryForm from './CategoryForm';
import ResourceForm from './ResourceForm';
import MappingForm from './MappingForm';

export const SelectForm = ({openForm}) => <l.LayoutCol>
    <h2>Create new</h2>
        <f.FormSelection 
            onClick={() => openForm({ viewId: 1 })}
            >Mapping
        </f.FormSelection>
        <f.FormSelection
            onClick={() => openForm({ viewId: 2 })}
            >Resource
        </f.FormSelection>
        <f.FormSelection
            onClick={() => openForm({ viewId: 3 })}
        >Category</f.FormSelection>
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
            {component: MappingForm, props: {id: 1, onClick: this.openForm, cancel: this.cancelForm}},
            {component: ResourceForm, props: {id: 2, onClick: this.openForm, cancel: this.cancelForm}},
            {component: CategoryForm, props: {id: 3, onClick: this.openForm, cancel: this.cancelForm}}
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

};

export default FormsContainer;