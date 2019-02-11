import styled from 'styled-components';

export const DetailGrid = styled.div`

  display: grid;
  grid-template:
  "detail-header  detail-actions" min-content
  "detail-content detail-lists  " 1fr
  / 60% 40%;
  grid-row-gap: 4px;
  
  height: 100%;
  width: inherit;
  border-radius: 3px;
  padding-top: 0;
`;

export const DetailHeaderLinks = styled.div`
  display: flex;
  grid-area: detail-actions;
  flex-direction: row-reverse;
  justify-content: space-between;
  padding: 0 6px;
`;


export const DetailContent = styled.div`
    grid-area: detail-content;
    /*background:rgba(60,63,65,0.35);*/
    background: ${p=>p.theme.colorGraphBackground}; 
    color: black;
    border-radius: 3px;
    overflow-y: scroll;
    border: 1px solid rgba(255,255,255,0.15);
    //height: 16em;
    width: inherit;
    text-align: justify;
    text-justify: inter-character;
    overflow-x: hidden;
    overflow-y: auto;
    
    > * {
      heigh: inherit;
      width: inherit;
      padding: 12px;
      p {
        text-wrap: wrap;
      }
      box-sizing: border-box;
    }
  
`;

export const HeaderBar = styled.div`
    grid-area: detail-header;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    letter-spacing: 0.05rem;
    height: 1.2em;
`;

export const ListBlock = styled.div`
    display: flex; 
    flex-direction: row;
    margin-left: 6px;
    min-width: 200px;
    flex-grow: 1;
    border-radius: 3px;
    border: 1px solid grey;
    height: inherit;
    max-height: inherit;
    overflow: hidden;
`;

export const ListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: auto;
    min-width: 100px;
    min-height: 20px;
    flex-grow: 1;
    flex-basis: 50%;
    flex-shrink: 1;
    //border: 1px solid grey;
    overflow-y: auto;
`;

export const List = styled.div`
    flex-direction: column;
    overflow-y: auto;
    margin: 0 4px;
    padding: 6px 0;
    flex-grow:1;
`;

export const ListLabel = styled.div`
    text-align: center;
    font-size: small;
    color: rgba(255,255,255,0.9);
    background-color: rgba(25,25,25, 0.5);
    padding: 4px;
    border-bottom: 1px solid rgba(255,255,255,.2);
    height: 1.2em;
    letter-spacing: 0.07rem;
`;


export const ListItem = styled.div`
    font-size: small;
    letter-spacing: 0.07em;
    text-align: center;
    // background-color: rgba(255,255,255,0.2);
    background-color: rgba(22,22,22, 0.5);
    padding: 2px;
    margin: 2px 0; 
    border-radius: 3px; 
    box-shadow: 0 0 2px rgba(255,255,255,0.1);
    :hover {
      background-color: rgba(255,255,255,0.1);
    }
    transition: all .15s ease-in-out;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    min-height: 1em;
`;


export const ActionLink = styled.small`
    flex-basis: auto;
    margin: 1px 6px;
    color: rgba(255,255,255,0.8);
    border-bottom: 2px solid transparent;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    shrink: 1;
    
    :first-of-type{
       border-left: none;
    }

    :hover {
      color: rgba(255,255,255,.6);
    }
    cursor: pointer;
`;
