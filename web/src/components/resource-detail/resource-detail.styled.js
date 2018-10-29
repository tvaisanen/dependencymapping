import styled from 'styled-components';

export const HeaderBar = styled.div`
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
export const DetailHeader = styled.h2`
   padding: 0;
   margin: 4px 0;
   color: rgba(255,255,255,0.9);
`;

export const List = styled.div`
    flex-direction: column;
    overflow-y: auto;
    margin: 0 4px;
    flex-grow:1;
`;

export const ListLabel = styled.div`
    text-align: center;
    font-weight: bold;
    color: rgba(255,255,255,0.9);
    margin: 4px 0;
    border-bottom: 1px solid rgba(255,255,255,.5);
    padding-left: 3px;
`;




export const ListItem = styled.div`
    font-size: small;
    letter-spacing: 0.05em;
    text-align: center;
    background-color: rgba(255,255,255,0.2);
    padding: 2px;
    margin: 2px 0; border-radius: 3px; box-shadow: 0 0 2px rgba(255,255,255,0.1);
    :hover {
      background-color: rgba(255,255,255,0.35);
    }
    transition: all .15s ease-in-out;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    min-height: 1em;
`;

export const Col = styled.div`

  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
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

export const ActionLink = styled.small`
    width: 100px;
    color: rgba(255,255,255,0.8);
    border-bottom: 2px solid transparent;
    padding: 0 20px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    :first-of-type{
       border-left: none;
    }

    :hover {
      color: rgba(255,255,255,.6);
    }
    cursor: pointer;
`;

export const DetailDescription = styled.div`
    background: rgba(255,255,255,.1);
    border-radius: 3px;
    overflow-y: scroll;
    border: 1px solid gray;
    height: inherit;
    //height: 16em;
    //width: 60%;
    flex-grow: 6;
    max-width: 70%;
    text-align: justify;
    text-justify: inter-character;
    box-shadow: 0 0 5px rgba(255,255,255,0.1);
    overflow-x: visible;
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