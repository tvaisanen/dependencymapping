import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as s from '../components';
import CategoryListContainer from './CategoryListContainer';
import styled from 'styled-components';
import * as l from '../components/layout';
import MarkDownRenderer from 'react-markdown-renderer';
import edit from '../icons/edit.png';
import add from '../icons/add.png';
import remove from '../icons/remove.png';

const List = styled.div`
    padding: 6px;
    margin: 6px;
`;

const ResourceDetail = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: 100%;
    width: 50rem;
    background: rgba(24,24,24,0.03);
    border-radius: 3px;
    border: 1px solid gray;
    justify-content: center;
    padding-top: 12px;
`;

const DetailBlock = styled.div`
    display: flex;
    flex-direction: column;
    width: ${props=>props.width};
    flex-grow: ${props=>props.grow};
    align-items: center;


`;

const DetailDescription = styled.div`
    background: rgba(255,255,255,.2);
    height:10rem;
    min-height: 100px;
    width: 30em;
    padding: 12px;
    border-radius: 3px;
    overflow-y: scroll;
    border: 1px solid gray;
    margin-top: 12px;
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
`;

const Categories = styled.div`
    display: flex;
    flex-wrap: wrap;
    height: auto;
    min-height: 1rem;
`;

const Button = styled.button`
    font-size: 1rem;
    border-radius: 6px;
    border: none;
    padding: 0px;
    margin: 12px;
    width: 32px;
    height: 32px;
    text-transform: uppercase;
    font-weight: bold;
    cursor: pointer;
`;

const ButtonIcon = styled.img`
    width: 1rem;
    height: 1rem;

`;

const EdgeListContainer = ({resource}) => <List>list</List>;
const ListItems = ({items}) => items.map(r => <ListItem>{r.name}</ListItem>)
      


const ResourceDetailContainer = ({
        detail, editResource, type, setDetail, isResourceInMap,
        addResourceToActiveMapping}) => (
    <ResourceDetail>
        {/* Row with two columns */}
  <DetailBlock>
 <DetailHeader>{detail.name}</DetailHeader>
    { 
        detail.categories ? 
        <Categories>
        {detail.categories.map(c=><CategoryLabel>{c.name}</CategoryLabel>)}
        </Categories>
        : null 
    }

       {/* Render mardkown description */}
      <DetailDescription>
        <MarkDownRenderer markdown={detail.description}/>
      </DetailDescription>

        {
          detail.connected_to ?
        <Categories>
        {detail.connected_to.map(r=><CategoryLabel
            onClick={()=>setDetail(r.name)}>{r.name}
            </CategoryLabel>)}
          </Categories>
              : null
          }

          <div>
          { 
              // If resources is already included in mapping 
              // provide a way to remove it and in the other
              // case add the resource to current mapping.
              isResourceInMap ?
              <Button>
                  <ButtonIcon src={remove}/>
              </Button>
              : 
              <Button onClick={()=>addResourceToActiveMapping(detail)}>
                <ButtonIcon src={add} />
              </Button>
          }
          <Button 
            onClick={() => console.edit({resource: detail, type: type})}> 
            <ButtonIcon src={edit} />
          </Button>
        </div>
        </DetailBlock>
        
   
            
  </ResourceDetail>
  )

  export default ResourceDetailContainer;

  ResourceDetailContainer.propTypes = {
      editResource: PropTypes.func.isRequired,
  }