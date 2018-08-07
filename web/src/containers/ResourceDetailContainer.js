import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions/index';
import {resourceCtrl} from "../controllers/resource-detail.controller";
import {
    DetailDescription,
    DetailLists,
    ResourceDetailHeader,
} from "../components/resource-detail";


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

const mapDispatchToProps = dispatch => bindActionCreators({...actionCreators}, dispatch)

export default connect(
    resourceCtrl.getResourceDetailProps,
    mapDispatchToProps
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
            align-items: center;
            height: inherit;
            > div {
            height: 90%;
        }`;








