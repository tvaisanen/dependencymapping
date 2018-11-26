//@flow

import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import groupTogglePanelCtrl from './group-toggle-panel.controller';

const Container = styled.div`
   display: flex;
   align-items: flex-end;
   justify-content: center;
   width: 100%;
   height: 0;
   overflow: visible;
`;

const Panel = styled.div`
  top: -20px;
  display: flex;
  width: auto;
  height: auto;
  padding: 12px;
   z-index: 2;
`;

const PanelButton = styled.div`
  border: 1px solid lightgrey;
  border-radius: 3px;
  margin: 0 6px;
  padding: 4px;
  min-width: 80px;
  text-align: center;
  background-color: ${p=>p.selected?"rgba(0,255,0,0.2)":"rgba(35,35,35,0.2)"};
  cursor: pointer;
`;


type GroupTogglePanelProps = {
    tags: Array<String>,
    toggleTagGroup: ({tagName: string}) =>  void
}

const GroupTogglePanel = (props: GroupTogglePanelProps) => {
    return <Container>
        <Panel>
            {props.tags ?
                props.tags.map(tag => (
                    <PanelButton
                        selected={tag.selected}
                        onClick={() => props.toggleTagGroup(tag.name)}>
                        {tag.name}
                    </PanelButton>))
                : null
            }
        </Panel>
    </Container>
};

export default connect(
    groupTogglePanelCtrl.mapStateToProps,
    groupTogglePanelCtrl.mapDispatchToProps
)(GroupTogglePanel);