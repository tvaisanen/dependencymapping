import styled from 'styled-components';


export const Container = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: inherit;
    z-index: 20;
    
    > div:nth-of-type(1) {
    }
    
    transition: all .3s ease-in-out;
`;

export const FormColumn = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 1;
    padding: 6px 12px;
    margin-right: 6px;
    flex-basis: 50%;
    background-color: white;
`;

export const SelectionColumn = styled.div`
    display: flex;
    flex-direction: column;
    transform: ${p=>p.visible? 'scaleX(1)': 'scaleX(0)'};
    transform-origin: right;
    flex-shrink: 2; 
    transition: all .3s ease-in-out;
    flex-basis: 40%;
`;

export const FormWrapper = styled.div`
    flex-grow: 1;
    display: flex;
    justify-content: flex-start;
    max-width: 100%;
    height: 100%;
    transition: all .3s ease-in-out;
    border-radius: 3px;
    flex-grow:1;
    
    > div {
        border-radius: 3px;
        border: ${p=>p.theme.cardBorder};
        background-color: ${p=>p.theme.cardHeaderBackgroundColor}; 
    }
`;

export const Select = styled.select`
    flex-basis: 100%;
    border: none;
`;

export const FieldGroup = styled.div`
    display: flex;
    flex-basis: 100%;
    border-top: 1px solid grey;
    padding-top: 6px;
`;

export const SelectionField = styled.div`
    display: flex;
    flex-shrink: 1;
    height: 1.4em;
    padding: 6px;
    flex-basis: 100%;
`;

export const Label = styled.div`
    font-size: small;
    padding-right: 8px;
    min-width: 40px;
`;

