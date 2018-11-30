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
import FormOptions from './components/ControllerNavTabs';
import SelectionMenus from './components/SelectionMenus';
import resourceControllerCtrl from './resource-controller.controller';
import * as types from '../../constants/types';
import * as apiHelpers from '../../common/api.helpers';
import * as sc from './resource-controller.styled';
import {MainBlock} from './resource-controller.styled';

// todo: refactor to store

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
            selections: true, // if there's the selects
            shape: "ellipse",
            color: "black",
            group: null
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
                    selectedTags: data.tags.map(t => t.name),
                    group: data.group,
                    shape: data.shape,
                    color: data.color
                })
            }

            // if the detail is type MAPPING do the same as for
            // asset.
            else if (type === types.MAPPING) {
                console.info(this.props.activeDetail);
                this.setState({
                    selectedResources: data.assets.map(r => r.name),
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
        const promise = formActions[formType].remove(name);
        this.handlePromise(promise);
    }

    actionPost(form) {
        console.group("actionPost()");
        const {formType, formActions} = this.props;
        console.info(form);
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
            } catch (e) {
                console.group("ResourceControllerContainer\ncloseFormAndSectActiveDetail({}) -> <Error>>");
                console.info(response);
                console.error(e);
                console.groupEnd();
            }


        }).catch(error => {
            if (apiHelpers.isNetworkError(error)) {
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

    createAssetAndSelect(assetName) {

        if (_.includes(this.props.assetNameList, assetName)) {
            // if asset exists, just add it to selected
            // but do not allow duplicates
            if (!_.includes(this.state.selectedResources, assetName)) {
                this.setState({selectedResources: [...this.state.selectedResources, assetName]});
            }
        } else {
            // if it does not exist create a new one and add it to selected
            const {promise, resolveCallback} = this.props.formActions[types.ASSET].post({name: assetName});
            promise.then(response => {
                resolveCallback(response.data);
                this.setState({selectedResources: [...this.state.selectedResources, response.data.name]})
            });
        }
        //

    }

    createTagAndSelect(tagName) {

        if (_.includes(this.props.tagNameList, tagName)) {
            // if tag already exists, just add the tag to selected
            // but do not allow duplicates
            if (!_.includes(this.state.selectedTags, tagName)) {
                this.setState({selectedTags: [...this.state.selectedTags, tagName]})
            }

        } else {
            // create the tag and add it to selected
            const {promise, resolveCallback} = this.props.formActions[types.TAG].post({name: tagName});
            promise.then(response => {
                resolveCallback(response.data);
                this.setState({selectedTags: [...this.state.selectedTags, response.data.name]})
            });
        }
        console.groupEnd();

    }

    getFormData() {
        console.info(this.state);
        return {
            name: this.state.name,
            description: this.state.description,
            resources: this.state.selectedResources,
            tags: this.state.selectedTags,
            group: this.state.group,
            color: this.state.color,
            shape: this.state.shape
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
        console.log(this.state)
        return (
            <sc.ResourceControllerLayout id="resource-controller-container">
                {/**/}
                <MainBlock column visible>
                    <div>
                        <FormOptions
                            // show form options if not editing
                            visible={!this.props.formEdit}
                            types={this.props.types}
                            setFormType={this.props.setFormType}/>

                        <div style={{
                            display: 'flex',
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <form.Label>Name</form.Label>
                            <form.Input
                                lock={this.props.formEdit}
                                readOnly={this.props.formEdit}
                                value={this.state.name}
                                valid={nameValid}
                                check={this.state.check}
                                onChange={(e) => {
                                    this.props.setResourceNameValue(e.target.value);
                                    this.setState({name: e.target.value})
                                }}
                            />
                            {this.state.errors.name ?
                                <form.ErrorMsg>{this.state.errors.name}</form.ErrorMsg>
                                : null
                            }

                        </div>
                    </div>
                    <SelectionMenus
                        setValue={(set) => {
                            console.info(set);
                            this.setState(set);
                        }}
                        assets={this.props.assetNameList}
                        formType={this.props.formType}/>

                    <form.Label>Description</form.Label>
                    <form.TextArea
                        rows="12"
                        value={this.state.description}
                        valid={descriptionValid}
                        check={this.state.check}
                        onChange={(e) => {
                            this.props.setResourceDescriptionValue(e.target.value);
                            this.setState({description: e.target.value})
                        }
                        }
                    />

                    <form.ButtonRow
                        edit={this.props.formEdit}
                        save={this.onSave}
                        remove={() => this.onDelete({name: this.state.name})}
                        cancel={this.props.closeEdit}/>


                </MainBlock>
                <sc.SecondaryBlock
                    visible={this.props.formType !== types.TAG}
                    id="form-col-two"
                    column
                >
                    {/* Selectable resource list */}
                    <FormSelectionBlock
                        labelOption="Available assets"
                        selectedLabel={this.props.formType === types.MAPPING ? "selected" : "connected to"}
                        onFilterChange={(e) => {
                            this.props.setAssetFilterValue(e.target.value);
                            this.setState({resourceFilter: e.target.value})
                        }}
                        options={filteredResources}
                        selected={selectedResources}
                        select={item => {
                            this.props.addAssetToSelected((item: string));
                            this.setState({
                                selectedResources: [...this.state.selectedResources, item]
                            })
                        }}
                        deselect={item => {
                            this.props.removeAssetFromSelected((item: string));
                            this.setState({
                                selectedResources: this.state.selectedResources
                                    .filter(r => r !== item)
                            })
                        }}
                        addItem={this.createAssetAndSelect}
                    />
                    {/* TAGS */}
                    <FormSelectionBlock
                        labelOption="Available tags"
                        selectedLabel="selected"
                        onFilterChange={(e) => {
                            this.props.setTagFilterValue(e.target.value);
                            this.setState({tagFilter: e.target.value})
                        }}
                        options={filteredTags}
                        selected={selectedTags}
                        select={item => {
                            this.props.addTagToSelected((item: string));
                            this.setState({
                                selectedTags: [...this.state.selectedTags, item]
                            })
                        }}
                        deselect={item => {
                            this.props.removeTagFromSelected((item: string));
                            this.setState({
                                selectedTags: this.state.selectedTags
                                    .filter(r => r !== item)
                            })
                        }}
                        addItem={this.createTagAndSelect}
                    />
                </sc.SecondaryBlock>
            </sc.ResourceControllerLayout>
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

