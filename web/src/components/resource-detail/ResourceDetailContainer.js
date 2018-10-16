import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {connect} from 'react-redux';
import resourceDetailCtrl from "./resource-detail.controller";
import {
    DetailDescription,
    DetailLists,
    ResourceDetailHeader,
} from "./resource-detail.components";


const ResourceDetailContainer = props => (
        <Detail id="resource-detail-container">
            <ResourceDetailHeader {...props}/>
            <DetailBlock>
                <DetailDescription
                    description={props.activeDetail.data.description}/>
                <DetailLists {...props}/>
            </DetailBlock>
        </Detail>
    )
;


export default connect(
    resourceDetailCtrl.stateToProps,
    resourceDetailCtrl.dispatchToProps
)(ResourceDetailContainer);

ResourceDetailContainer.propTypes = {
    activeDetail: PropTypes.object.isRequired,
    addToMap: PropTypes.func,
    editDetail: PropTypes.func,
    isResourceInMap: PropTypes.bool,
    lists: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        key: PropTypes.string,
        type: PropTypes.string
    })).isRequired,
    removeFromMap: PropTypes.func,
    setActiveDetail: PropTypes.func
};


const Detail = styled.div`
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            height: 100%;
            width: 67%;
            background: rgba(24,24,24,0.03);
            border-radius: 3px;
            `;

const DetailBlock = styled.div`
            display: flex;
            flex-direction: row;
            width: auto;
            flex-grow: 1;
            align-items: flex-start;
            height: inherit;
        
`;








