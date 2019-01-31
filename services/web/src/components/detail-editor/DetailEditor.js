//@flow
import React, {Suspense} from 'react';
import {ASSET, CONNECTION, MAPPING, TAG} from "../../constants";
import {connect} from 'react-redux';
//import SelectionMenus from './components/SelectionMenus';
import FormButtons from './components/ControllerNavTabs';
import {AssetSelection, TagSelection, DescriptionTextarea} from "./components/";
import NameInputField from "./components/NameInputField";
import ConnectionForm, {ConnectionSelections} from './components/connection-form-components';
import {
    Container,
    EditorGrid,
    FormColumn, InflateGridCell,
    ListSelection,
    ResourceDetails,
    SelectionColumn
} from "./detail-editor.styled";

const SelectionMenus = React.lazy (() => import('./components/SelectionMenus'));

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


const TagSelections = () => <InflateGridCell>Tag does not have any selectable assets</InflateGridCell>;

const formComponentsByType = {
    [ASSET]: {formComponent: AssetForm, selectionComponent: AssetSelections},
    [CONNECTION]: {formComponent: ConnectionForm, selectionComponent: ConnectionSelections},
    [MAPPING]: {formComponent: MappingForm, selectionComponent: MappingSelections},
    [TAG]: {formComponent: TagForm, selectionComponent: TagSelections},
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

const DetailEditorGrid = (props: DetailEditorProps) => {

    // select fields by form type
    const Form = formComponentsByType[props.formType].formComponent;

    // null if no selection
    const Selection = formComponentsByType[props.formType].selectionComponent;

    return (
        <EditorGrid>
            <FormButtons/>
                <Suspense fallback={<div>Loading...</div>}>
                <ResourceDetails>
                    <Form/>
                </ResourceDetails>
                <ListSelection visible={Selection()}>
                    <Selection/>
                </ListSelection>
                </Suspense>
        </EditorGrid>)
};

export default connect(
    (state, props) => ({
        formType: state.detailForm.formType,
        error: state.detailForm.errorMsg
    }),
    {}
)(DetailEditorGrid);
