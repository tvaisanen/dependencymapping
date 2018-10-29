// Mappingform

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as form from './form.components';
import {connect} from 'react-redux'
import * as resourceHelpers from '../../common/resource-helpers';
import {filterItems} from "../../common";
import * as validators from '../../common/validators';
import {FormSelectionBlock} from "./form.components";
import * as _ from 'lodash';
import styled from 'styled-components';
import ControllerNavTabs from './components/ControllerNavTabs';
import resourceControllerCtrl from './resource-controller.controller';
import * as types from '../../constants/types';
import * as apiHelpers from '../../common/api.helpers';

class ResourceControllerContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resourceFilter: "",
            selectedResources: [],
            tagFilter: "",
            selectedTags: [],
            name: "",
            description: "",
            errors: {},
            type: props.formType,
            selections: true // if there's the selects
        }

        this.createAssetAndSelect = this.createAssetAndSelect.bind(this);
        this.createTagAndSelect = this.createTagAndSelect.bind(this);
        this.actionDelete = this.actionDelete.bind(this);
        this.actionPost = this.actionPost.bind(this);
        this.actionUpdate = this.actionUpdate.bind(this);
        this.onSave = this.onSave.bind(this);
        this.handlePromise = this.handlePromise.bind(this);
        this.clearErrors = this.clearErrors.bind(this);

    }

    componentDidMount() {
        if (this.props.formEdit) {

            // if the form is in edit mode
            // get data from the active detail
            const {type, data} = this.props.activeDetail;

            // copy the active detail information to the
            // components state to edit
            this.setState({
                name: data.name,
                description: data.description
            });

            // if the detail is type ASSET get resources
            // connected to and tags
            if (type === types.ASSET) {
                this.setState({
                    selectedResources: data.connected_to.map(r => r.name),
                    selectedTags: data.tags.map(t => t.name)
                })
            }

            // if the detail is type MAPPING do the same as for
            // asset.
            else if (type === types.MAPPING) {
                console.info(this.props.activeDetail);
                this.setState({
                    selectedResources: data.resources.map(r => r.name),
                    selectedTags: data.tags.map(t => t.name),
                })
            }
        }
    }

    exists({id, set}) {
        return resourceHelpers.mappingExists({id: id, mappings: set});
    }

    actionDelete({name}) {
        const {formType, formActions} = this.props;
        const promise = formActions[formType].remove({name});
        this.handlePromise(promise);
    }

    actionPost(form) {
        console.group("actionPost()");
        const {formType, formActions} = this.props;
        const {promise, resolveCallback} = formActions[formType].post(form);
        this.handlePromise({promise, resolveCallback});
        console.groupEnd();
    }

    handlePromise({promise, resolveCallback}) {
        promise.then(response => {

            console.group("Debug deleting :: handlePromise()");
            console.info(response);
            console.info(resolveCallback);
            console.groupEnd();

            try {
                // There is not necessarily data returned
                // with the response and  all callbacks
                // do not require the data.
                const data = response.data || {};
                resolveCallback(data);

            } catch (e) {
                console.group("responseCallback(response.data || {}) -> <Error>>");
                console.info(response);
                console.info(e);
                console.groupEnd();
            }

            try {
                this.props.closeFormAndSetActiveDetail({
                    setDetail: response.status !== 204, // don't set detail if deleted
                    data: response.data,
                    type: this.props.formType,
                });
            } catch (e){
                console.group("ResourceControllerContainer\ncloseFormAndSectActiveDetail({}) -> <Error>>");
                console.info(response);
                console.error(e);
                console.groupEnd();
            }


        }).catch(error => {
            if (apiHelpers.isNetworkError){
                console.error("Network Error");
            } else {
                // only error should be if the name is already reserved
                console.group("Debugging error");
                console.info(JSON.stringify(error));
                Object.keys(error).forEach(key => {
                    console.groupCollapsed(key);
                    console.info(error[key]);
                    console.groupEnd();
                });
                console.groupEnd();
                this.setState({errors: error.response.data});
            }
        })
    }

    actionUpdate(form) {
        console.group("actionUpdate()");
        const {formType, formActions} = this.props;
        const promise = formActions[formType].put(form);
        this.handlePromise(promise);
        console.groupEnd();
    }

    toggleValidation() {
        this.setState({check: true});
    }


    createAssetAndSelect(assetName) {

        // quick asset creation, post new asset with just a name to quicker input
        const {promise, resolveCallback} = this.props.formActions[types.ASSET].post({name: assetName});
        promise.then(response => {
            resolveCallback(response.data);
            this.setState({selectedResources: [...this.state.selectedResources, response.data.name]})
        });

    }

    createTagAndSelect(tagName) {
        const {promise, resolveCallback} = this.props.formActions[types.TAG].post({name: tagName});
        promise.then(response => {
            resolveCallback(response.data);
            this.setState({selectedTags: [...this.state.selectedTags, response.data.name]})
        });
    }

    getFormData() {
        return {
            name: this.state.name,
            description: this.state.description,
            resources: this.state.selectedResources.map(n => ({name: n})),
            tags: this.state.selectedTags,
        }
    }

    clearErrors() {
        this.setState({errors: {}})
    }

    onSave() {
        // clear errors
        this.clearErrors();
        const {formType, formActions} = this.props;
        const parsedData = formActions[formType]
            .parseForm(this.getFormData());
        console.group("On Save");
        console.info(parsedData);
        console.info(this.props.formType);
        this.props.formEdit ?
            this.actionUpdate(parsedData)
            : this.actionPost(parsedData);
        console.groupEnd();
    }

    onDelete({name}) {
        this.actionDelete({name});
        this.props.clearActiveDetail();
        this.props.closeEdit();
    }

    onCancel() {

    }

    render() {
        const {tagNameList, assetNameList} = this.props;
        const {
            resourceFilter, selectedResources,
            tagFilter, selectedTags
        } = this.state;
        const nameValid = validators.validMappingName(this.state.name);
        const descriptionValid = validators.validDescription(this.state.description);

        // handle resource filtering
        const notSelectedResources = assetNameList.filter(name => {
            // return !_.includes(selectedResources, name);
            return !_.includes(selectedResources, name)
        });

        const filteredResources = filterItems({
            items: notSelectedResources,
            filterValue: resourceFilter
        });

        // handle tag filtering
        const notSelectedTags = tagNameList.filter(name => {
            return !_.includes(selectedTags, name);
        });

        const filteredTags = filterItems({
            items: notSelectedTags,
            filterValue: tagFilter
        });

        return (
            <ResourceControllerLayout id="resource-controller-container">
                {/**/}
                <MainBlock column visible>
                    {
                        /* todo: refactor logic
                         * If editing, do not show the other
                         * form options
                         */
                        this.props.formEdit ? null :
                            <ControllerNavTabs
                                types={this.props.types}
                                setFormType={this.props.setFormType}/>
                    }

                    <form.Label>Name</form.Label>
                    <form.Input
                        lock={this.props.formEdit}
                        readOnly={this.props.formEdit}
                        value={this.state.name}
                        valid={nameValid}
                        check={this.state.check}
                        onChange={(e) => this.setState({name: e.target.value})}
                    />
                    {this.state.errors.name ?
                        <form.ErrorMsg>{this.state.errors.name}</form.ErrorMsg>
                        : null
                    }

                    <form.Label>Description</form.Label>
                    <form.TextArea
                        rows="12"
                        value={this.state.description}
                        valid={descriptionValid}
                        check={this.state.check}
                        onChange={(e) =>
                            this.setState({description: e.target.value})
                        }
                    />

                    <form.ButtonRow
                        edit={this.props.formEdit}
                        save={this.onSave}
                        remove={() => this.onDelete({name: this.state.name})}
                        cancel={this.props.closeEdit}/>


                </MainBlock>
                <SecondaryBlock
                    visible={this.props.formType !== types.TAG}
                    id="form-col-two"
                    column
                    >
                    {/* Selectable resource list */}
                    <FormSelectionBlock
                        labelOption="Available assets"
                        selectedLabel={this.props.formType === types.MAPPING ? "selected" : "connected to"}
                        onFilterChange={(e) => this.setState({resourceFilter: e.target.value})}
                        options={filteredResources}
                        selected={selectedResources}
                        select={item => this.setState({
                            selectedResources: [...this.state.selectedResources, item]
                        })}
                        deselect={item => this.setState({
                            selectedResources: this.state.selectedResources
                                .filter(r => r !== item)
                        })}
                        addItem={this.createAssetAndSelect}
                    />
                    {/* TAGS */}
                    <FormSelectionBlock
                        labelOption="Available tags"
                        selectedLabel="selected"
                        onFilterChange={(e) => this.setState({tagFilter: e.target.value})}
                        options={filteredTags}
                        selected={selectedTags}
                        select={item => this.setState({
                            selectedTags: [...this.state.selectedTags, item]
                        })}
                        deselect={item => this.setState({
                            selectedTags: this.state.selectedTags
                                .filter(r => r !== item)
                        })}
                        addItem={this.createTagAndSelect}
                    />
                </SecondaryBlock>
            </ResourceControllerLayout>
        );
    }
}

const formActionsShape = {
    post: PropTypes.func.isRequired,
    put: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired
};

ResourceControllerContainer.propTypes = {
    tagNameList: PropTypes.arrayOf(PropTypes.string),
    assetNameList: PropTypes.arrayOf(PropTypes.string),
    formActions: PropTypes.shape({
        [types.MAPPING]: PropTypes.shape(formActionsShape),
        [types.ASSET]: PropTypes.shape(formActionsShape),
        [types.TAG]: PropTypes.shape(formActionsShape)
    }),
    cancelEdit: PropTypes.func.isRequired,
    formType: PropTypes.string.isRequired,
    formEdit: PropTypes.bool.isRequired
};


export default connect(
    resourceControllerCtrl.mapStateToProps,
    resourceControllerCtrl.dispatchToProps
)(ResourceControllerContainer);

const ResourceControllerLayout = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  color: rgba(255,255,255,0.8);
`;


export const MainBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: center; 
    border: ${p=>p.theme.defaultBorder};
    border-radius: ${p=>p.theme.borderRadius};
    width: ${p =>
        p.visible ?
            "100%"
            : "0"
    };
    visibility: ${p =>
        p.visible ?
            'visible'
            : 'hidden'
            
    };
    height: inherit;
    flex-grow: 3;
    padding: 0 12px;  
    transform: ${p =>
    p.visible ?
        "scaleX(1)"
        : "scaleX(0)"};
    transition:
      transform 300ms ease-in-out,
      width 500ms ease-in-out,
      flex-grow 1000ms ease-in-out;
      
    transform-origin: right;
    
`;

export const SecondaryBlock = styled.div`
    height: inherit;
    display: flex;
    flex-direction: ${props => props.column ? 'column' : 'row'};
    background: ${props => props.bg};
    justify-content: center;
    align-items: center;
    align-self: center;
    margin-left: 12px;
    border: ${p=>p.theme.defaultBorder};
    border-radius: ${p=>p.theme.borderRadius};
    width: ${p =>
        p.visible ?
            "100%"
            : "0"
    };
    visibility: ${p =>
        p.visible ?
            'visible'
            : 'hidden'
            
    };
    flex-grow: 3;
    padding: 0 12px;  
    border-radius: 3px;
    transform: ${p =>
    p.visible ?
        "scaleX(1)"
        : "scaleX(0)"};
    transition:
      transform 300ms ease-in-out,
      width 500ms ease-in-out,
      flex-grow 1000ms ease-in-out;
      
    transform-origin: right;
    
`;

