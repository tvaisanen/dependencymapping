//@flow
import React from 'react';
import {TAG} from "../../constants";
import {connect} from 'react-redux';
import styled from 'styled-components';
import SelectionMenus from './components/SelectionMenus';
import ControllerNavTabs from './components/ControllerNavTabs';
import { AssetSelection, TagSelection, DescriptionTextarea } from "./components/";
import NameInputField from "./components/NameInputField";
import EditorButtons from "./components/EditorButtons";

const Container = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: inherit;
    z-index: 20;
    > div {
        border: 1px solid lightgrey;
        border-radius: 3px;
    }
    
    transition: all .3s ease-in-out;
`;

type DetailEditorProps = {
    formType: ASSET | MAPPING | TAG
}

const FormColumn = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    flex-basis: 60%;
    flex-shrink: 1;
    padding: 0 12px;
    margin-right: 6px;
`;

const SelectionColumn = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 40%;
    flex-shrink: 2; 
`;

const DetailEditor = (props: DetailEditorProps) => {
    return <Container>
        <FormColumn>
            <ControllerNavTabs/>
            <NameInputField/>
            <SelectionMenus/>
            <DescriptionTextarea/>
            <EditorButtons/>
        </FormColumn>

        {
            props.formType !== TAG ?
                <SelectionColumn>
                    <AssetSelection/>
                    <TagSelection/>
                </SelectionColumn>
                : null
        }
    </Container>
}

export default connect(
    (state, props) => ({formType: state.detailForm.formType}),
    {}
)(DetailEditor);
