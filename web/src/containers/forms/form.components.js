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
    background: rgba(255,255,255,.4);
`;

export const FormSelection = styled.div`
    background: green;
    color: white;
`;