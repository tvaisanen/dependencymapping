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
                this.setState({
                    selectedResources: data.resource,
                    selectedTags: data.tags
                })
            }
        }
    }

    exists({id, set}) {
        return mappingExists({id: id, mappings: set});
    }

    actionDelete({name}) {
        const {formType, formActions} = this.props;
        return formActions[formType].remove({name});
    }

    actionPost(form) {
        const {formType, formActions} = this.props;
        const response = formActions[formType].post(form);
        this.handlePromise(response);
    }

    handlePromise(promise) {
        promise.then(resolved => {

            console.group("Post response");

            const status = resolved.status ?
                resolved.status
                : resolved.response.status;

            if (status === 201) {
                this.props.closeFormAndSetActiveDetail({
                    data: resolved.data,
                    type: this.props.formType,
                })

            } else if (status === 400) {
                //only error should be if the name is already reserved
                console.info(resolved.response);
                this.setState({errors: resolved.response.data})
            }

            console.groupEnd();
        })
    }

    actionUpdate(form) {
        const {formType, formActions} = this.props;
        return formActions[formType].put(form);
    }

    toggleValidation() {
        this.setState({check: true});
    }


    createAssetAndSelect(assetName) {
        // quick asset creation,
        // post new asset with just a name
        // to quicker input
        const promise = this.props.formActions[types.ASSET].post({name: assetName})
        promise.then(r=>{
            console.info(r);
        });
        this.setState({
            selectedResources: [...this.state.selectedResources, assetName]
        })
    }

    createTagAndSelect(tagName) {
        this.props.createTag(tagName);
        this.setState({
            selectedTags: [...this.state.selectedTags, tagName]
        })
    }

    getFormData() {
        return {
            name: this.state.name,
            description: this.state.description,
            resources: this.state.selectedResources.map(n => ({name: n})),
            tags: this.state.selectedTags.map(n => ({name: n})),
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
        console.groupCollapsed("On Save");
        console.info(parsedData);
        this.props.formEdit ?
            this.actionUpdate(parsedData)
            : this.actionPost(parsedData);
        console.groupEnd();
    }

    onDelete({name}) {
        this.actionDelete({name});
        this.props.clearActiveDetail();
        this.props.cancelEdit();
    }

    onCancel() {

    }

    render() {
        console.groupCollapsed("Props");
        console.info(this.props);
        console.groupEnd();
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
            <form.Inflater column>
                <form.Container column visible>
                    <ControllerNavTabs
                        types={this.props.types}
                        setFormType={this.props.setFormType}/>
                    <form.Label>Name</form.Label>
                    <form.Input
                        lock={this.props.formEdit}
                        readOnly={this.props.formEdit}
                        value={this.state.name}
                        valid={nameValid}
                        check={this.state.check}
                        onChange={(e) =>
                            this.setState({name: e.target.value})}
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
                        cancel={this.props.cancelEdit}/>

                </form.Container>
                <form.Container
                    visible={this.props.formType !== types.TAG}
                    id="form-col-two"
                    column>
                    {/* Selectable resource list */}
                    <FormSelectionBlock
                        labelOption="resources"
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
    // mappingFormCtrl.getMappingFormProps(state)
    tagNameList: PropTypes.arrayOf(PropTypes.string),
    assetNameList: PropTypes.arrayOf(PropTypes.string),
    // mappingFormCtrl.getDispatchedTransactions(dispatch)
    formActions: PropTypes.shape({
        [types.MAPPING]: PropTypes.shape(formActionsShape),
        [types.ASSET]: PropTypes.shape(formActionsShape),
        [types.TAG]: PropTypes.shape(formActionsShape)
    }),
    cancelEdit: PropTypes.func.isRequired,
    // refactor to store ?
    formType: PropTypes.string.isRequired,
};


export default connect(
    resourceControllerCtrl.mapStateToProps,
    resourceControllerCtrl.dispatchToProps
)(ResourceControllerContainer);
