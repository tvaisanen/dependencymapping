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
    flex-basis: 60%;
    flex-shrink: 1;
    padding: 0 12px;
    margin-right: 6px;
    
`;


export const SelectionColumn = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    flex-basis: ${p=>p.visible? '40%' : '0'};
    transform: ${p=>p.visible? 'scaleX(1)': 'scaleX(0)'};
    transform-origin: right;
    flex-shrink: 2; 
    transition: all .3s ease-in-out;
`;

export const FormWrapper = styled.div`
    flex-grow: 1;
    display: flex;
    justify-content: center;
    flex-basis: 100%;
    height: 100%;
    transition: all .3s ease-in-out;
    border: 1px solid lightgrey;
        border-radius: 3px;
        flex-grow:1;
`;
