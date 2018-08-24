import React from 'react';
import styled from 'styled-components';

const NavTab = styled.span`
        text-decoration: ${p=>p.selected?'underline':null};
        background-color: rgba(255,255,255,0.2);
        padding: 4px 12px;
        margin: 2px 12px; 
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

export const ControllerNavTabs = ({setFormType, formType, types}) => (
    <NavTabs>
        <NavTab
            selected={formType === types.ASSET}
            onClick={() => setFormType(types.ASSET)}>
            Asset
        </NavTab>
        <NavTab onClick={() => setFormType(types.MAPPING)}>
            Mapping
        </NavTab>
        <NavTab onClick={() => setFormType(types.TAG)}>
            Tag
        </NavTab>
    </NavTabs>
)