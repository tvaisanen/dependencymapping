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
            <ResourceDetailHeader
                id="resource-detail-header"
                {...props}/>
            <DetailBlock id="resource-detail__detail-block">
                {
                    props.activeDetail.type === "EMPTY" ?
                        <NoSelection/>
                        :
                        <React.Fragment>
                        <DetailDescription
                            id="resource-detail__detail-block__description"
                            description={props.activeDetail.data.description}/>
                            <DetailLists id="resource-detail__detail-block__lists"
                {...props}/>
                        </React.Fragment>
                }
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
            //width: 67%;
            flex-grow: 3;
            background: rgba(24,24,24,0.03);
            border-radius: 3px;
            border: 1px solid grey;
            align-content: center;
`;

const DetailBlock = styled.div`
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            flex-grow: 1;
            height: inherit;
            margin: 12px;
        
`;

const Header = styled.span`
  font-size: large;
  letter-spacing: 0.1rem;
`;
const NoSelection = () => <Header>No Selection</Header>;





