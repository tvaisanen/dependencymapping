import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as l from '../components/layout';
import styled from 'styled-components';
import MappingForm from './forms/MappingForm';
import ResourceForm from './forms/ResourceForm';
import CategoryForm from './forms/TagForm';
import ResourceDetail from './ResourceDetail';
import ResourceBrowserContainer from './ResourceBrowserContainer';
import FormsContainer from './forms/FormsContainer';

class BottomPanelContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: 0, // 0: detail, 1,2,3 forms:mapping,resource,category
            edit: false,

        }

        this.views = [
            {header: "detail", component: ResourceBrowserContainer, type: ""},
            {header: "forms", component: FormsContainer, type: "FORMS"},
            {header: "mapping", component: MappingForm, type: "MAPPING"},
            {header: "resource", component: ResourceForm, type: "RESOURCE"},
            {header: "category", component: CategoryForm, type: "CATEGORY"},
        ];

        this.editResource = this.editResource.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.setView = this.setView.bind(this);

    }

    cancelEdit() {
        this.setState({view: 0, edit: false})
    }

    setView(v) {
        this.setState({view: v});
    }


    editResource({resource, type}) {
        console.debug("Edit " + type);
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
            <BottomPanel id="bottom-panel-container">

                {/*         todo: refactor to a component        */}

                <PanelNavigation>
                    <div>
                        {/* Left Block*/}
                        <PanelNavItem
                            selected={this.state.view === 0}
                            onClick={() => this.setState({view: 0})}
                            largePadding
                        >Resources
                        </PanelNavItem>
                        <PanelNavItem
                            selected={this.state.view === 1}
                            onClick={() => this.setState({view: 1})}
                            largePadding
                        >Create
                        </PanelNavItem>
                    </div>
                </PanelNavigation>

                {/* ############################################## */}

                <PanelContent id="panel-content">
                    <view.component
                        edit={this.state.edit}
                        detail={this.props.detail}          // current selected resource
                        type={this.props.detailType}        // type of the viewed resource
                        editResource={this.editResource}    // function to change to edit view
                        cancel={this.cancelEdit}
                        setDetail={this.props.setDetail}
                        setView={this.setView}
                        cyRef={this.props.cy}
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
    max-width: 100vw;
    flex-grow: 1;
    width: 100vw;
    height: inherit;
    max-height: 40vh;
    padding: 12px; 
    transform: ${props => props.collapsed ? 'scaleY(0)' : 'scaleY(1)'};
    background: ${props => props.collapsed ? 'white' : null};
`;

const PanelNavigation = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 4px 4px 0 24px;
    background: rgba(100, 100, 105, 0.3);
    border-bottom: solid 1px rgba(255,255,255,.8);
    margin-bottom: 4px;
`;


const PanelNavItem = styled.span`
    background: ${props => props.selected ? 'rgba(255,255,255,.8)' : 'rgba(255,255,255,0.5)'};
    padding: ${props => props.largePadding ? '0 16px' : '0 4px'};
    border-radius: 3px 3px 0px 0px;
    margin: 2px;
    cursor: pointer;
`;

const PanelContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fafafa;
    background: transparent;
    height: 88%;
    max-height: 33vh;
    padding: 12px;
    border: 2px dashed green;
`;

