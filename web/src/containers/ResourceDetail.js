import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MarkDownRenderer from 'react-markdown-renderer';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions/index';
import {resourceCtrl} from "../controllers/resource.controller";
import {
    DetailLists,
    ResourceDetailHeader
} from "../components/resource-detail";




class ResourceDetail extends Component {

    render() {
        const {
            addToMap,
            removeFromMap,
            isResourceInMap,
            editDetail,
            activeDetail,
            lists,
            setActiveDetail
        } = this.props;


        return (
            <Detail id="resource-detail-container">
                {/* column with two three rows */}
                <ResourceDetailHeader
                    activeDetail={activeDetail}
                    isResourceInMap={isResourceInMap}
                    editDetail={editDetail}
                    addToMap={addToMap}
                    removeFromMap={removeFromMap}
                />

                <DetailBlock>
                    {/* Render markdown description */}
                    <DetailDescription>
                        <MarkDownRenderer markdown={activeDetail.data.description}/>
                    </DetailDescription>

                    <ListBlock>
                        <DetailLists
                            lists={lists}
                            setActiveDetail={setActiveDetail}
                        />

                    </ListBlock>

                </DetailBlock>
            </Detail>
        )
    }
}

const mapStateToProps = (state, ownProps = {}) => {
    const detailProps = resourceCtrl.getResourceDetailProps(state, ownProps);
    console.info(detailProps);
    return {
        ...detailProps
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({...actionCreators}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ResourceDetail);

ResourceDetail.propTypes = {
    activeDetail: PropTypes.object.isRequired,
    editDetail: PropTypes.func,
    setActiveDetail: PropTypes.func,
    isResourceInMap: PropTypes.bool,
    addToMap: PropTypes.func,
    detailType: PropTypes.string,
    removeFromMap: PropTypes.func,
    lists: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        key: PropTypes.string,
        type: PropTypes.string
    })).isRequired
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
        }
            `;

const DetailDescription = styled.div`
            background: rgba(255,255,255,.2);
            border-radius: 3px;
            overflow-y: scroll;
            border: 1px solid gray;
            margin-top: 12px;
            height: inherit;
            width: 70%;
            max-width: 70%;
            flex-grow: 2;
            padding: 5px 30px;
            text-align: justify;
            text-justify: inter-character;
            box-shadow: 0 0 20px rgba(255,255,255,0.2);
            `;


const ListBlock = styled.div`
            display: flex;
            margin: 12px;
            flex-direction: column;
            flex-grow: 8;
            width: 30%;
            height: inherit;
            `;





