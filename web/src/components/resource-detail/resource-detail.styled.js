import styled from 'styled-components';


export const ListBlock = styled.div`
            display: flex;
            margin: 12px;
            flex-direction: column;
            flex-grow: 8;
            width: 30%;
            height: inherit;
            `;
export const DetailHeader = styled.h2`
            margin: 4px 0;
            color: rgba(255,255,255,0.9);
            `;

export const List = styled.div`
            max-width: 200px;
            overflow-y: scroll;
            margin: 0 4px;
            min-height: 2em;
            `;

export const ListLabel = styled.div`
            text-align: center;
            font-weight: bold;
            color: rgba(255,255,255,0.9);
            margin: 4px 0;
            border-bottom: 1px solid rgba(255,255,255,.5);
            padding-left: 3px;
            max-width: 200px;
            `;



export const ListItem = styled.div`
            font-size: small;
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

export const ActionLink = styled.span`
            width: 100px;
            color: rgba(255,255,255,0.8);
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

export const DetailDescription = styled.div`
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