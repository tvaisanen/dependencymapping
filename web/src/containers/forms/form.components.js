import styled from 'styled-components';


export const Container = styled.div`
    display: flex;
    flex-direction: ${props=>props.column? 'column':'row'};
    background: ${props=>props.bg};
    justify-content: center;
    align-items: center;
    height: inherit;
    width: 100%;
    flex-grow: 1;
    padding: 0 12px;
    
`;

export const Header = styled.h2`
    margin: 0;
`;

export const Label = styled.label``;

export const Button = styled.button``;

export const Input = styled.input`
    width: inherit;
`;

export const TextArea = styled.textarea`
    width: inherit;
    min-width: 200px;
`;

export const Selection = styled.select`
    width: 100%;
    border-radius: 3px;
    border: none;

`;

export const Option = styled.option`
`;

export const ButtonBox = styled.div`
    margin: 12px 0;
`;

export const SelectionList = styled.select`
    overflow-y: auto;
    overflow-x: hidden;
    height: 200px;
    width: 200px;
    background: rgba(255,255,255,.4);
`;

export const FormSelectionItems = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

`;

export const FormSelection = styled.div`
    display: flex;
    justify-content: center;
    margin: 4px;
    flex-grow: 1;
    border: 2px solid black;
    border-radius: 3px;
    padding: 4px;
    width: 100%; 
    color: black;
    cursor: pointer;
    :hover {
      background: rgba(100,100,100,0.3);
    }
`;