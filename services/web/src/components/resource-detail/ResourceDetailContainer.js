import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';

import resourceDetailCtrl from "./resource-detail.controller";
import {DetailLayout} from './resource-detail.styled';

import ActiveDetailDescription from './components/ActiveDetailDescription';
import ActiveDetailLists from './components/ActiveDetailLists';
import ResourceDetailHeader from './components/ResourceDetailHeader';
import InActiveMappingToggle from './components/InActiveMappingToggle';
import EditButton from './components/EditButton';
import {EMPTY} from "../../constants";


const ResourceDetailContainer = props => (
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
        <DetailLayout id="resource-detail-container">
            {props.detailType === EMPTY ?
                <EmptyDetail>
                    <h1>
                        No selection
                    </h1>
                </EmptyDetail>
                :
                <React.Fragment>
                    <div>
                        <ResourceDetailHeader id="resource-detail-header"/>
                        <ActiveDetailDescription
                            description={props.activeDetail.data.description}
                            id="resource-detail__detail-block"
                        />
                    </div>
                    <div>
                        <div><InActiveMappingToggle/> <EditButton/></div>
                        <ActiveDetailLists id="resource-detail__detail-block__lists"/>
                    </div>
                </React.Fragment>
            }

        </DetailLayout>
    )
;


export default connect(
    resourceDetailCtrl.mapStateToProps,
    resourceDetailCtrl.mapDispatchToProps
)(ResourceDetailContainer);

const EmptyDetail = styled.div`
    display: flex;
    flex-direction: row;
    align-self: center;
    justify-content: center;
    text-align: center;
    width: 100%;
`;
