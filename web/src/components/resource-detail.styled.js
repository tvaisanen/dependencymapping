import styled from 'styled-components';

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