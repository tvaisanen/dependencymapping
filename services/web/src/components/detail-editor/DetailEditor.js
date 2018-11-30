//@flow
import React from 'react';
import {TAG} from "../../constants";
import {connect} from 'react-redux';
import styled from 'styled-components';
import SelectionMenus from '../resource-controller/components/SelectionMenus';
import ControllerNavTabs from '../resource-controller/components/ControllerNavTabs';
import { AssetSelection, TagSelection, DescriptionTextarea } from "./components/";
import * as form from '../form.components';

const Container = styled.div`
    display: flex;
  position: fixed;
  top:0;
  right:0;
  width: 100%;
  min-height: 400px;
  height: 50%;
  z-index: 20;
  border: grey;
  border-radius: 3px;
  margin: 12px;
  background-color: rgba(0,0,0,1);
  color: white;
`;

type DetailEditorProps = {}

const DetailEditor = (props: DetailEditorProps) => {
    return <Container>
        DetailEditor
        <div>
            {Object.keys(props)
                .map(key => <div>{key}: {JSON.stringify(props[key])}</div>)}
        </div>
        <div>
            <ControllerNavTabs/>
            <SelectionMenus/>
            <DescriptionTextarea/>
        </div>

        {
            props.formType !== TAG ?
                <div style={{width: "50%"}}>
                    <AssetSelection/>
                    <TagSelection/>
                </div>
                : null
        }
    </Container>
}

export default connect(
    (state, props) => ({...state.detailForm}),
    {}
)(DetailEditor);
