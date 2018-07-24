import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MarkDownRenderer from 'react-markdown-renderer';
import * as types from '../constants/types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions/index';
import {getAllResourcesWithTag} from "../common/resource-helpers";

const detailListFragment = ({label, items, type, onClick}) => (
    <React.Fragment>
        <ListLabel>{label}</ListLabel>
        <List>
            {items ?
                items.map((item, i) => <ListItem
                        key={i}
                        onClick={() => onClick({
                            data: item,
                            type: type
                        })}>{item.name}
                    </ListItem>
                ) : null
            }
        </List>
    </React.Fragment>);


const listCompositionInstructions = {
    /**
     * Define what keys are listed in the detail view
     *
     * label: List title
     * key: { key: [...values] }
     * type: type of the listed items
     * */
    [types.RESOURCE]: [
        {label: "Tags", key: "tags", type: types.TAG},
        {label: "Connections", key: "connected_to", type: types.RESOURCE}
    ],
    [types.MAPPING]: [
        {label: "Tags", key: "tags", type: types.TAG},
        {label: "Resources", key: "resources", type: types.RESOURCE}
    ],
    [types.TAG]: [
        {label: "Resources", key: false, type: types.RESOURCE}
    ],
    [types.EMPTY]: [],
};

const getLists = ({detail, detailType, setDetail, items}) => {
    return listCompositionInstructions[detailType].map(data => ({
            label: data.label,
            onClick: setDetail,
            items: data.key ? detail[data.key] : items,
            type: data.type
        })
    );
};

class ResourceDetail extends Component {

    render() {
        const {
            isResourceInMap,
            editDetail,
            detailType,
            detail,
            setDetail
        } = this.props;

        console.info(detail)


        // get the list composition information
        // if detail type is TAG a derived set of
        // list items is requierd.
        // variable items is ignored in other case.
        const items = detailType === types.TAG ?
            getAllResourcesWithTag({tagId: detail.name, resources: this.props.resources})
            : false
        ;

        const lists = getLists({detail, detailType, setDetail, items});


        // render the lists to list fragments if there's a list and
        // there's at least one element
        const listFragments = lists && lists.length >= 1 ?
            lists.map(list => detailListFragment({...list}))
            : null
        ;

        // if detailType is TAG derived resource list is required
        //const resourcesWithTag = getAllResourcesWithTag(detail.name);

        return (
            <Detail id="resource-detail-container">
                {/* column with two three rows */}
                <Row>
                    {detailType ?
                        <React.Fragment>
                            <small>{detailType}</small>
                            <div>
                            </div>
                            <span>
                <RenderToggleButton
                    inMap={isResourceInMap}
                    addToMap={this.props.addToMap}
                    removeFromMap={this.props.removeFromMap}
                    detail={detail}
                    detailType={detailType}
                />
                <ActionLink
                    onClick={() => editDetail({resource: detail, type: detailType})}>
                    edit
                </ActionLink>
            </span>
                        </React.Fragment>
                        : null
                    }
                </Row>
                <Row header>
                    <DetailHeader>{detail.name}</DetailHeader>
                </Row>

                <DetailBlock>
                    {/* Render markdown description */}
                    <DetailDescription>
                        <MarkDownRenderer markdown={detail.description}/>
                    </DetailDescription>

                    <ListBlock>
                        { //render the derived list fragments here:
                            listFragments
                        }
                    </ListBlock>

                </DetailBlock>
            </Detail>
        )
    }
}

const mapStateToProps = (state, ownProps = {}) => {
    return {
        ...state, ...ownProps
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({...actionCreators}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ResourceDetail);

ResourceDetail.propTypes = {
    detail: PropTypes.object,
    editDetail: PropTypes.func,
    type: PropTypes.string,
    setActiveDetail: PropTypes.func,
    isResourceInMap: PropTypes.bool,
    addResourceToActiveMapping: PropTypes.func,
    detailType: PropTypes.string,
    removeResourceFromActiveMapping: PropTypes.func,
};


const RenderToggleButton = ({detailType, inMap, addToMap, removeFromMap, detail}) => {

    if (detailType === types.RESOURCE) {
        return (
            <ResourceInMappingToggleButton
                inMap={inMap}
                addToMap={addToMap}
                removeFromMap={removeFromMap}
                detail={detail}
            />);
    } else {
        return null;
    }
}

const ResourceInMappingToggleButton = ({inMap, addToMap, removeFromMap, detail}) => {
    if (inMap) {
        return <ActionLink onClick={() => removeFromMap(detail)}>remove from map</ActionLink>
    } else {
        return <ActionLink onClick={() => addToMap(detail)}>add to map</ActionLink>
    }
};

const Row = styled.div`
            display: flex;
            flex-direction: row;
            align-items: center;
            height: ${props =>
    props.header ?
        '36px' : '24px'
    };
            min-height: ${props =>
    props.header ?
        '36px' : '24px'
    };
            justify-content: ${props =>
    props.center ? 'center' : 'space-between'
    };
            padding: 0 12px;

            `;

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

const DetailHeader = styled.h2`
            margin: 4px 0;
            color: rgba(255,255,255,0.9);
            `;

const ListBlock = styled.div`
            display: flex;
            margin: 12px;
            flex-direction: column;
            flex-grow: 8;
            width: 30%;
            height: inherit;
            `;

const List = styled.div`
            max-width: 200px;
            overflow-y: scroll;
            margin: 0 4px;

            `;

const ListLabel = styled.div`
            text-align: center;
            font-weight: bold;
            color: rgba(255,255,255,0.9);
            margin: 4px 0;
            border-bottom: 1px solid rgba(255,255,255,.5);
            padding-left: 3px;
            max-width: 200px;
            `;

const ListItem = styled.div`
            font-size: small;
            background-color: rgba(255,255,255,0.2);
            padding: 2px;
            margin: 2px 0; border-radius: 3px; box-shadow: 0 0 2px rgba(255,255,255,0.1);
            :hover {
              background-color: rgba(255,255,255,0.35);
            }
            transition: all .15s ease-in-out;
            cursor: pointer;
            `;

const ActionLink = styled.span`
            width: 100px;
            color: rgba(255,255,255,0.3);
            border-bottom: 2px solid transparent;
            padding: 0 20px;

            :first-of-type{
               border-left: none;
            }

            :hover {
              color: rgba(255,255,255,.6);
            }
            cursor: pointer;
         `;
