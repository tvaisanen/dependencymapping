import styled from 'styled-components';

export const NewListItemForm = styled.div`
    display: flex;
    flex-direction: column;
    height: ${props => 
        props.collapsed ? 
        '0' : 
        'auto'
    };

`;

export const ListItemInput = styled.input`

`;

export const Input = styled.input`
  background: transparent;
  border: none;
  border-bottom: solid 2px grey;
  margin: 0 6px;
`;

export const Button = styled.button`
    background: rgba(255,255,255,0.2);
    color: #fafafa;
    border-radius: 4px;
    padding: 4px;
    border: none;
    cursor: pointer;
`;