import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MappingForm from './forms/MappingForm';
import ResourceForm from './forms/ResourceForm';
import CategoryForm from './forms/TagForm';
import ResourceBrowserContainer from './ResourceBrowserContainer';
import FormsContainer from './forms/FormsContainer';
import * as types from '../constants/types';
import {connect} from 'react-redux'
import * as actionCreators from '../actions/index';
import {bindActionCreators} from 'redux';


class BottomPanelContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: 0,        // 0: detail, 1,2,3 forms: mapping, resource, category
            edit: false,    // "edit-mode"

        };

        this.views = [
            {header: "detail", component: ResourceBrowserContainer, type: ""},
            {header: "forms", component: FormsContainer, type: "FORMS"},
            {header: "mapping", component: MappingForm, type: "MAPPING"},
            {header: "resource", component: ResourceForm, type: "RESOURCE"},
            {header: "category", component: CategoryForm, type: "CATEGORY"},
        ];

        this.editDetail = this.editDetail.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.setView = this.setView.bind(this);

    }

    cancelEdit() {
        this.setState({view: 0, edit: false})
    }

    setView(v) {
        this.setState({view: v});
    }


    editDetail({resource, type}) {
        /**
         * Panel container has the information about, which
         * detail is selected and if it is in "edit-mode".
         * This will tell the form if the detail is needed
         * to be loaded.
         * */
        console.debug("Edit " + type);
        console.debug(resource);
        this.setState({edit: true});
        // get proper component from the views
        switch (type) {
            case types.MAPPING:
                this.setState({view: 2})
                break;
            case types.RESOURCE:
                this.setState({view: 3})
                break;
            case types.TAG:
                this.setState({view: 4})
                break
            default:
                break;
        }
    }

    render() {

        const view = this.views[this.state.view];
        console.info(this.props)
        return (
            <BottomPanel id="bottom-panel-container">

                <PanelNavTabs
                    selectedView={this.state.view}
                    setView={this.setView}
                    tabItems={tabItems}
                />

                <PanelContent id="panel-content">
                    <view.component
                        edit={this.state.edit}
                        detail={this.props.activeDetail}          // current selected resource
                        type={this.props.detailType}        // type of the viewed resource
                        editDetail={this.editDetail}        // function to change to edit view
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

const mapStateToProps = (state, ownProps = {}) => {
    return {
        activeDetail: state.activeDetail.data

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({...actionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomPanelContainer);

const tabItems = [
    {label: 'Resources', viewId: 0},
    {label: 'Create', viewId: 1},
];

const PanelNavTabs = ({selectedView, tabItems, setView}) => (
    <PanelNavigation>
        <div>
            {
                tabItems.map((tab,i) => (
                    <PanelNavTab
                        key={i}
                        selected={selectedView === tab.viewId}
                        onClick={() => setView(tab.viewId)}
                        largePadding
                    >{tab.label}
                    </PanelNavTab>
                ))
            }
        </div>
    </PanelNavigation>
);

const BottomPanel = styled.div`
    max-width: 100vw;
    flex-grow: 1;
    width: 100vw;
    height: inherit;
    max-height: 40vh;
    padding: 12px; 
    transform: ${props => props.collapsed ? 'scaleY(0)' : 'scaleY(1)'};
    background: ${props => props.collapsed ? 'white' : null};
    color: rgba(255,255,255,0.8);
`;

const PanelNavigation = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 4px 4px 0 24px;
    background: rgba(100, 100, 105, 0.3);
    border-bottom: solid 1px rgba(255,255,255,.8);
    margin-bottom: 4px;
`;


const PanelNavTab = styled.span`
    font-size: small;
    font-weight: bold;
    color: ${props => props.selected ? 'rgba(255,255,255,.9)' : 'rgba(255,255,255,0.5)'};
    background: ${props => props.selected ? 'rgba(255,255,255,.3)' : 'rgba(255,255,255,0.25)'};
    padding: ${props => props.largePadding ? '0 16px' : '0 4px'};
    border-radius: 3px 3px 0px 0px;
    margin: 2px;
    cursor: pointer;
    box-shadow: ${props => props.selected ? '0px -1px 2px rgba(255,255,255,.7)' : null};
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
`;

