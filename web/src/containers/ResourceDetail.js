import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as s from '../components';
import CategoryListContainer from './CategoryListContainer';
import styled from 'styled-components';
import * as l from '../components/layout';
import MarkDownRenderer from 'react-markdown-renderer';
import edit from '../icons/edit.png';
import add from '../icons/add.png';
import remove from '../icons/remove.png';
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

const List = styled.div`
    padding: 6px;
    margin: 6px;
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
    flex-direction: column;
    width: auto;
    flex-grow: 1;
    align-items: center;

`;

const DetailDescription = styled.div`
    background: rgba(255,255,255,.2);
    border-radius: 3px;
    overflow-y: scroll;
    border: 1px solid gray;
    margin-top: 12px;
    height: 100%;
    width: inherit;
    flex-grow: 1;
    padding: 10px 30px;
    text-align: justify;
    text-justify: inter-character;
`;

const DetailHeader = styled.h2`
  margin: 4px 0;
`;

const ListItem = styled.li`
    list-style: none;
    border-left: solid 2px white;
    border-bottom: solid 2px rgba(200,200,200,0.1);
    margin-bottom: 4px;
    padding-left: 4px;
`;

const CategoryLabel = styled.span`
    font-size: .8rem;
    text-align: center;
    padding: 2px;
    margin: 2px;
    border: 1px solid grey;
    border-radius: 2px;
    height: 1rem;
    cursor: pointer;
    :hover {
      background-color: #8a8a8a;
    }
    transition: background-color .2s ease-in-out;
`;

const Categories = styled.div`
    display: flex;
    flex-wrap: wrap;
    height: auto;
    min-height: 1rem;
`;

const Button = styled.button`
    font-size: 1rem;
    border-radius: 3px;
    border: none;
    padding: 0px;
    margin: 12px;
    width: 20px;
    height: 20px;
    text-transform: uppercase;
    font-weight: bold;
    cursor: pointer;
`;

const ButtonIcon = styled.img`
    width: 1rem;
    height: 1rem;
`;

const WrapRow = styled.div`
  flex-grow: 2;
  display: flex;
  flex-wrap: wrap;

`;

const EdgeListContainer = ({resource}) => <List>list</List>;
const ListItems = ({items}) => items.map(r => <ListItem>{r.name}</ListItem>)


const ResourceDetail = ({
                            detail, editResource, type, setDetail, isResourceInMap,
                            addResourceToActiveMapping, detailType, removeResourceFromActiveMapping
                        }) => (
    <Detail id="resource-detail-container">
        {/* column with two three rows */}
        <Row>
            <small>{detailType}</small>
            <span>
                <RenderToggleButton
                    inMap={isResourceInMap}
                    addToMap={addResourceToActiveMapping}
                    removeFromMap={removeResourceFromActiveMapping}
                    detail={detail}
                    detailType={detailType}
                />
                <Button onClick={() => console.edit({resource: detail, type: type})}>
                    <ButtonIcon src={edit}/>
                </Button>
            </span>
        </Row>
        <Row center header>
            <DetailHeader>{detail.name}</DetailHeader>
        </Row>
        <DetailBlock>
            {
                detail.categories ?
                    <Categories>
                        {detail.categories.map(c => <CategoryLabel>{c.name}</CategoryLabel>)}
                    </Categories>
                    : null
            }

            {/* Render mardkown description */}
            <DetailDescription>
                <MarkDownRenderer markdown={detail.description}/>
            </DetailDescription>

            <WrapRow>
            {
                detail.connected_to ?
                    <Categories>
                        {detail.connected_to.map(r => <CategoryLabel
                            onClick={() => setDetail(r.name)}>{r.name}
                        </CategoryLabel>)}
                    </Categories>
                    : null
            }</WrapRow>


        </DetailBlock>

    </Detail>
)

export default ResourceDetail;

ResourceDetail.propTypes = {
    editResource: PropTypes.func.isRequired,
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
        return <Button onClick={() => removeFromMap(detail)}>
            <ButtonIcon src={remove}/>
        </Button>
    } else {
        return <Button onClick={() => addToMap(detail)}>
            <ButtonIcon src={add}/>
        </Button>
    }
};