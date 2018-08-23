// Mappingform

import React from 'react';
import PropTypes from 'prop-types';
import * as form from './form.components';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/index';
import {mappingExists} from '../../common/resource-helpers';
import {filterItems} from "../../common";
import * as validators from '../../common/validators';
import BaseForm from './BaseForm';
import mappingFormCtrl from '../../controllers/mapping-form.controller';
import {FilterInputField} from "../../components/common.components";
import {FormSelectionBlock} from "./form.components";
import * as _ from 'lodash';

class MappingForm extends BaseForm {
    constructor(props){
        super(props);
        this.state = {
            resourceFilter: "",
            selectedResources: [],
            tagFilter: "",
            selectedTags: [],
            name: "",
            description: "",
            error: {},
            type: props.formType,
            selections: true // if there's the selects
        }

        this.createAssetAndSelect = this.createAssetAndSelect.bind(this);
        this.createTagAndSelect = this.createTagAndSelect.bind(this);

    }

    exists({id, set}) {
        return mappingExists({id: id, mappings: set});
    }

    actionDelete({name}) {
        console.info("actionDeleteMapping(" + name + ")");
        return this.props.deleteMapping({name});
    }

    actionPost(mapping) {
        return this.props.postMapping(mapping);
    }

    actionUpdate(mapping) {
        return this.props.updateMapping(mapping);
    }

    toggleValidation() {
        this.setState({check: true});
    }



    createAssetAndSelect(assetName){
        alert("createAndSelect")
        this.props.createAsset(assetName)
        this.setState({
            selectedResources: [this.state.selectedResources, assetName]
        })
    }

    createTagAndSelect(tagName){
        this.props.createTag(tagName);
        this.setState({
            selectedTags: [this.state.selectedTags, tagName]
        })
    }

    getFormData() {
        return {
            name: this.state.name,
            description: this.state.description,
            resources: this.state.selectedResources.map(n=> ({name: n})),
            tags: this.state.selectedTags.map(n=> ({name: n})),
        }
    }

    render() {
        const { tagNameList, resourceNameList } = this.props;
        const {
            resourceFilter, selectedResources,
            tagFilter, selectedTags
        } = this.state;
        const nameValid = validators.validMappingName(this.state.name);
        const descriptionValid = validators.validDescription(this.state.description);

        // handle resource filtering
        const notSelectedResources = resourceNameList.filter(name => {
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
                <form.Container row id="form-col-one">
                    <form.Container column>
                        Asset | Mapping | Tag
                        <form.Label>Name</form.Label>
                        <form.Input
                            lock={this.props.edit}
                            readOnly={this.props.edit}
                            value={this.state.name}
                            valid={nameValid}
                            check={this.state.check}
                            onChange={(e) =>
                                this.setState({name: e.target.value}) }
                        />
                        {this.state.error.name ?
                            <form.ErrorMsg>{this.state.error.name}</form.ErrorMsg>
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
                    edit={this.props.edit}
                    save={this.onSave}
                    remove={() => this.onDelete({name: this.state.name})}
                    cancel={this.props.cancel}/>

                    </form.Container>
                    <form.Container id="form-col-two" column>
                        {/* Selectable resource list */}
                        <FormSelectionBlock
                            labelOption="resources"
                            onFilterChange={(e) => this.setState({resourceFilter:e.target.value})}
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
                            onFilterChange={(e) => this.setState({tagFilter:e.target.value})}
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
                </form.Container>
            </form.Inflater>
        );
    }
}

MappingForm.propTypes = {
    // mappingFormCtrl.getMappingFormProps(state)
    tagNameList: PropTypes.array,
    resourceNameList: PropTypes.array,
    // mappingFormCtrl.getDispatchedTransactions(dispatch)
    updateMapping: PropTypes.func.isRequired,
    postMapping: PropTypes.func.isRequired,
    deleteMapping: PropTypes.func.isRequired,
    setActiveDetail: PropTypes.func.isRequired,
    // refactor to store ?
    detail: PropTypes.object,
    cancel: PropTypes.func.isRequired,
    setView: PropTypes.func.isRequired,
    createTag:PropTypes.func.isRequired,
    createAsset: PropTypes.func.isRequired,
};


export default connect(
    mappingFormCtrl.getMappingFormProps,
    mappingFormCtrl.getDispatchedTransactions
)(MappingForm);

