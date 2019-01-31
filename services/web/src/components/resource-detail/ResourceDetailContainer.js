import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';

import resourceDetailCtrl from "./resource-detail.controller";
import {DetailHeaderLinks, DetailGrid} from './resource-detail.styled';

import ActiveDetailDescription from './components/ActiveDetailDescription';
import ActiveDetailLists from './components/ActiveDetailLists';
import ResourceDetailHeader from './components/ResourceDetailHeader';
import InActiveMappingToggle from './components/InActiveMappingToggle';
import EditButton from './components/EditButton';
import {EMPTY} from "../../constants";


const ResourceDetail = props => (
        /**
         *  Resource detail layout
         *
         *  DetailLayout = () => <div>
         *  --------------------------------------------
         *  :      detail header    : toggle     / edit :
         *  -------------------------------------------
         *  :                       :  asset  :  tag    :
         *  :   detail description  :  list   :  list   :
         *  :       here            :         :         :
         *  :                       :                   :
         *  --------------------------------------------
         *  </div>
         */
        <DetailGrid id="resource-detail-container">
            {props.detailType === EMPTY ?
                <EmptyDetail>
                    <h1>
                        No selection
                    </h1>
                </EmptyDetail>
                :
                <React.Fragment>
                    <ResourceDetailHeader id="resource-detail-header"/>
                    <ActiveDetailDescription
                        description={props.activeDetail.data.description}
                        id="resource-detail__detail-block"
                    />
                    <HeaderActionLinks/>
                    <ActiveDetailLists id="resource-detail__detail-block__lists"/>
                </React.Fragment>
            }

        </DetailGrid>
    )
;

const HeaderActionLinks = () => (
    <DetailHeaderLinks>
        <EditButton/>
        <InActiveMappingToggle/>
    </DetailHeaderLinks>
);


export default connect(
    resourceDetailCtrl.mapStateToProps,
    resourceDetailCtrl.mapDispatchToProps
)(ResourceDetail);

const FlexReverseRow = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-start;
`;

const EmptyDetail = styled.div`
    display: flex;
    grid-row: span 2;
    grid-column: span 2;
    flex-direction: row;
    align-self: center;
    justify-content: center;
    text-align: center;
    width: 100%;
`;
