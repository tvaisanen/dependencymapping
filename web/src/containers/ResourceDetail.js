import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MarkDownRenderer from 'react-markdown-renderer';
import * as types from '../constants/types';

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
    margin: 2px 0;
    border-radius: 3px;
    box-shadow: 0 0 2px rgba(255,255,255,0.1);
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

const ResourceDetail = ({
                            detail, editDetail, type, setDetail, isResourceInMap,
                            addResourceToActiveMapping, detailType, removeResourceFromActiveMapping
                        }) => (
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
                    addToMap={addResourceToActiveMapping}
                    removeFromMap={removeResourceFromActiveMapping}
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


            {/* Render mardkown description */}
            <DetailDescription>
                <MarkDownRenderer markdown={detail.description}/>
            </DetailDescription>

            {/**           REFACTOR ME             */
                detailType !== types.TAG ?
                    <ListBlock>
                        {// render tags if detail has them
                            detail.tags ?
                                <React.Fragment>
                                    <ListLabel>Tags</ListLabel>
                                    <List>
                                        {detail.tags.map((t,i) => <ListItem key={i}>{t.name}</ListItem>)}
                                    </List>
                                </React.Fragment>
                                : <span>[no tags]</span>
                        }
                        {
                            detail.connected_to ?
                                <React.Fragment>
                                    <ListLabel>Connections</ListLabel>
                                    <List>
                                        {
                                            detail.connected_to.map((r,i) => <ListItem
                                                key={i}
                                                onClick={() => setDetail({
                                                        detail: r.name,
                                                        type: detailType
                                            })}>{r.name}
                                        </ListItem>)}
                                    </List>
                                </React.Fragment>
                                : <span>[no connections]</span>
                        }
                    </ListBlock>
                    : null
                /**            TILL HERE               */
            }

        </DetailBlock>
    </Detail>
)

export default ResourceDetail;

ResourceDetail.propTypes = {
    editDetail: PropTypes.func.isRequired,
    setDetail: PropTypes.func.isRequired,
    detail: PropTypes.object.isRequired
}

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