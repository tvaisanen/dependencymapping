import React from 'react';
import * as types from '../../../constants/types';
import {connect} from 'react-redux'
import styled from 'styled-components';
import * as actions from '../../../actions';

const NavTab = styled.span`
        text-decoration: ${p=>p.selected?'underline':null};
        font-weight: bold;
        background-color: ${p=>p.selected ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.1)'};; 
        color: ${p=>p.selected?'rgba(36,36,36,0.9)': 'rgba(255,255,255,0.2)'};
        padding: 4px 12px;
        margin: 2px 6px; 
        border-radius: 3px;
        :hover {
          background-color: rgba(244,244,244,0.3);
        }
        transition: all .15s ease-in-out;
        cursor: pointer;
        min-height: 1.2em;
`;

const NavTabs = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  padding: 20px;
`;

const ControllerNavTabs = ({setFormType, formType, types}) => (
    <NavTabs>
        <NavTab
            selected={formType === types.ASSET}
            onClick={() => setFormType(types.ASSET)}>
            Asset
        </NavTab>
        <NavTab
            selected={formType === types.MAPPING}
            onClick={() => setFormType(types.MAPPING)}>
            Mapping
        </NavTab>
        <NavTab
            selected={formType === types.TAG}
            onClick={() => setFormType(types.TAG)}>
            Tag
        </NavTab>
    </NavTabs>
);

const mapStateToProps = (state, props) => ({
    formType: state.app.form.type,
    types: types,
});

const mapDispatchToProps = (dispatch) => ({
    setFormType: (formType) => dispatch(actions.setFormType(formType))
});

export default connect(
    mapStateToProps,
        mapDispatchToProps
)(ControllerNavTabs)