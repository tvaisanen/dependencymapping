//@flow
import React from 'react';
import {ASSET, CONNECTION, MAPPING, TAG} from "../../constants";
import {connect} from 'react-redux';
import SelectionMenus from './components/SelectionMenus';
import ControllerNavTabs from './components/ControllerNavTabs';
import { AssetSelection, TagSelection, DescriptionTextarea } from "./components/";
import NameInputField from "./components/NameInputField";
import EditorButtons from "./components/EditorButtons";

import ConnectionForm, { ConnectionSelections} from './components/connection-form-components';

import {Container, FormColumn, FormWrapper, SelectionColumn } from "./detail-editor.styled";

type DetailEditorProps = {
    formType: ASSET | CONNECTION | MAPPING | TAG
}

const AssetForm = () => (
    <React.Fragment>
        <NameInputField/>
        <SelectionMenus/>
        <DescriptionTextarea/>
    </React.Fragment>
);

const AssetSelections = () => (
    <React.Fragment>
       <AssetSelection/>
       <TagSelection/>
    </React.Fragment>
);


const MappingForm = () => (
     <React.Fragment>
            <NameInputField/>
            <SelectionMenus/>
            <DescriptionTextarea/>
    </React.Fragment>
);

const MappingSelections = () => (
    <React.Fragment>
       <AssetSelection/>
       <TagSelection/>
    </React.Fragment>
)

const TagForm = () => (
     <React.Fragment>
            <NameInputField/>
            <SelectionMenus/>
            <DescriptionTextarea/>
    </React.Fragment>
);

const TagSelections = () => null;

const formComponentsByType = {
    ASSET: {formComponent: AssetForm, selectionComponent: AssetSelections},
    CONNECTION: {formComponent: ConnectionForm, selectionComponent: ConnectionSelections},
    MAPPING: {formComponent: MappingForm, selectionComponent: MappingSelections},
    TAG: {formComponent: TagForm, selectionComponent: TagSelections},
}
/**
 *  Asset:
 *      - fields: name, description,group, node color, node shape
 *      - selection: connected_to (asset), tags
 *  Connection:
 *      - fields: source, target, description, line type, line color, arrow shape
 *      - selection: tags
 *  Mapping:
 *      - fields: name, description
 *      - selection: assets, tags
 *  Tag:
 *      - fields: name, description
 *
 */
const DetailEditor = (props: DetailEditorProps) => {

    // select fields by form type
    const Form = formComponentsByType[props.formType].formComponent;

    // null if no selection
    const Selection = formComponentsByType[props.formType].selectionComponent;

    return <Container>
        <ControllerNavTabs/>
        <FormWrapper>
        <FormColumn>
            <Form/>
            <EditorButtons/>
        </FormColumn>
        <SelectionColumn visible={Selection()}>
            <Selection/>
        </SelectionColumn>
        </FormWrapper>
    </Container>
}

export default connect(
    (state, props) => ({formType: state.detailForm.formType}),
    {}
)(DetailEditor);
