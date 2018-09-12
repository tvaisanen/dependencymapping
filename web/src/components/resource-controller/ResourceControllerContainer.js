// Mappingform

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as form from './form.components';
import {connect} from 'react-redux'
import {mappingExists} from '../../common/resource-helpers';
import {filterItems} from "../../common";
import * as validators from '../../common/validators';
import {FormSelectionBlock} from "./form.components";
import * as _ from 'lodash';

import ControllerNavTabs from './components/ControllerNavTabs';
import resourceControllerCtrl from './resource-controller.controller';
import * as types from '../../constants/types';

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

    componentDidMount(){
        if (this.props.formEdit){
            const {type,data} = this.props.activeDetail;
            this.setState({
                name: data.name,
                description: data.description
            });
            if (type === types.ASSET){
                this.setState({
                    selectedResources: data.connected_to
                        .map(r=>r.name),
                    selectedTags: data.tags
                        .map(t=>t.name)
                })
            } else if (type === types.MAPPING){
                console.info(this.props.activeDetail);
                this.setState({
                    selectedResources: data.resources.map(r=>r.name),
                    selectedTags: data.tags.map(t=>t.name),
                })
            }
        }
    }

    exists({id, set}) {
        return mappingExists({id: id, mappings: set});
    }

    actionDelete({name}) {
        const {formType, formActions} = this.props;
        const promise = formActions[formType].remove({name});
        this.handlePromise(promise);
    }

    actionPost(form) {
        console.group("actionPost()");
        const {formType, formActions} = this.props;
        const response = formActions[formType].post(form);
        this.handlePromise(response);
        console.groupEnd();
    }

    handlePromise(promise) {
        promise.then(resolved => {


            const status = resolved.status ?
                resolved.status
                : resolved.response.status;

            console.groupCollapsed(`handleResponse(${status})`);

            if ((status === 200) || (status === 201)) {

                //
                this.props.closeFormAndSetActiveDetail({
                    data: resolved.data,
                    type: this.props.formType,
                });

            } else if (status === 400) {

                // only error should be if the name is already reserved
                console.group("Debuggint response: 400");
                console.info(resolved);
                console.groupEnd();
                this.setState({errors: resolved.data})
            }

            console.groupEnd();
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
        const promise = this.props.formActions[types.ASSET].post({name: assetName});

        promise.then(r => {
            this.setState({ selectedResources: [...this.state.selectedResources, assetName] })
        });
    }

    createTagAndSelect(tagName) {
        const promise = this.props.formActions[types.TAG].post({name: tagName});
        promise.then(r => {
            console.info(r);
            this.setState({
                selectedTags: [...this.state.selectedTags, tagName]
            })
        });
    }

    getFormData() {
        return {
            name:           this.state.name,
            description:    this.state.description,
            resources:      this.state.selectedResources.map(n => ({name: n})),
            tags:           this.state.selectedTags,
        }
    }

    clearErrors(){
        this.setState({errors:{}})
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
            <form.Inflater id="resource-controller-container" column>
                {/**/}
                <form.Container column visible >
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


                </form.Container>
                <form.Container
                    visible={this.props.formType !== types.TAG}
                    id="form-col-two"
                    column>
                    {/* Selectable resource list */}
                    <FormSelectionBlock
                        labelOption="resources"
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
                        labelOption="tags"
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
                </form.Container>
            </form.Inflater>
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
