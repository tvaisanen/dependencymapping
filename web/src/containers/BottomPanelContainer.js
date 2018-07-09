import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as l from '../components/layout';
import styled from 'styled-components';
import MappingForm from './forms/MappingForm';
import ResourceForm from './forms/ResourceForm';
import CategoryForm from './forms/CategoryForm';
import ResourceDetailContainer from './ResourceDetailContainer';
import ResourceBrowserContainer from './ResourceBrowserContainer';
import FormsContainer from './forms/FormsContainer';

class BottomPanelContainer extends Component {
  constructor(props){
      super(props);
      this.state = {
        view: 1, // 0: detail, 1,2,3 forms:mapping,resource,category
        edit: false,
        
      }
  
      this.views = [
        { header: "detail",     component: ResourceBrowserContainer, type: "" },
        { header: "forms",      component: FormsContainer,          type: "FORMS" },
        { header: "mapping",    component: MappingForm,             type: "MAPPING" },
        { header: "resource",   component: ResourceForm,            type: "RESOURCE" },
        { header: "category",   component: CategoryForm,            type: "CATEGORY" },
      ];

      this.editResource = this.editResource.bind(this);
      this.cancelEdit = this.cancelEdit.bind(this);
  
    } 

    cancelEdit(){
        this.setState({view: 0, edit: false})
    }



    editResource({resource, type}){
        console.debug("Edit " + type );
        console.debug(resource);
        this.setState({edit: true})
        // get proper component from the views
        switch (type) {
            case "MAPPING":
            this.setState({view: 2})
            break;
            case "RESOURCE":
            this.setState({view: 3})
            break;
            case "CATEGORY":
            this.setState({view: 4})
            break
        }
    }
    render() {

      const view = this.views[this.state.view];
        return (
            <BottomPanel>
                <PanelNavigation>
                    <div>
                        {/* Left Block*/}
                        <PanelNavItem 
                            selected={this.state.view === 0}
                            onClick={()=>this.setState({view: 0})} 
                            largePadding
                            >Resources
                        </PanelNavItem>    
                         <PanelNavItem 
                            selected={this.state.view === 1}
                            onClick={()=>this.setState({view: 1})} 
                            largePadding
                            >+
                        </PanelNavItem>    
                    </div>
                    <div>
                        {/* Right Block */}
                        {/*
                        <PanelNavLabel>create:</PanelNavLabel>
                        <PanelNavItem
                            selected={this.state.view === 2} 
                            onClick={()=>this.setState({view: 2})} 
                            >Mapping 
                        </PanelNavItem>    
                        <PanelNavItem 
                            selected={this.state.view === 3}
                            onClick={()=>this.setState({view: 3})}
                            >Resource
                        </PanelNavItem>    
                        <PanelNavItem 
                            selected={this.state.view === 4}
                            onClick={()=>this.setState({view: 4})}
                            >Category
                        </PanelNavItem> */}
                    </div>
                </PanelNavigation>
                <PanelContent id="panel-content">
            <view.component 
                edit={this.state.edit}
                detail={this.props.detail}          // current selected resource
                type={this.props.detailType}        // type of the viewed resource
                editResource={this.editResource}    // function to change to edit view
                cancel={this.cancelEdit}
                setDetail={this.props.setDetail}
            />
            </PanelContent>
            </BottomPanel>
        );
    }
}

BottomPanelContainer.propTypes = {
    detail: PropTypes.object.isRequired,
};

export default BottomPanelContainer;

const BottomPanel = styled.div`
    max-width: auto;
    flex-grow: 1;
    width: 100vw;
    height: inherit;
    max-height: 40vh; 
    transform: ${props=>props.collapsed ? 'scaleY(0)' : 'scaleY(1)'};
    background: ${props=>props.collapsed? 'white':null};
`;

const PanelNavigation = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 4px 4px 0 24px;
    background: rgba(100, 100, 105, 0.3);
    border-bottom: solid 1px rgba(255,255,255,.8);
    margin-bottom: 4px;
`;

const PanelNavLabel = styled.span`
    margin: 4px;
    padding: 2px;
    color: #fafafa;
    font-weight: bold;
`;

const PanelNavItem = styled.span`
    background: ${props=>props.selected ? 'rgba(255,255,255,.8)' :'rgba(255,255,255,0.5)'};
    padding: ${props=>props.largePadding ? '0 16px' : '0 4px'};
    border-radius: 3px 3px 0px 0px;
    margin: 2px;
    cursor: pointer;
`;

const PanelContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: auto;
    padding: 0 24px;
    color: #fafafa;
    background: transparent;
    height: 90%;
    padding: 12px 0;
    
`; 

const VisibilityToggle = styled.span`
    position: relative;
    transform: translateY(-20px);
    background: yellow;
    width: 16px;
    height: 8px;
    margin-left: 2px;
    cursor: pointer;
`;

