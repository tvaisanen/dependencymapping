import styled from 'styled-components';


export const EditorGrid = styled.div`
  display: grid;
  grid-template:
  "resource-selection resource-details list-selection" 1fr
  / 16em 3fr 2fr;
  height: 100%;
  width: 100%;
  border-radius: 3px;
  border: ${p=>p.theme.cardBorder}; 
  > div {
    max-height: 100%;
  }
`;

export const ResourceSelection = styled.div`
    width: 16em;
    grid-area: resource-selection;
    display: flex;
    flex-direction: column;
    height: inherit;
    background-color: ${p=>p.theme.cardBackgroundColor}; 
    border-radius: 3px;
`;


export const ResourceDetails = styled.div`
    grid-area: resource-details;
    max-height: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`;

export const ListSelection = styled.div`
    display: flex;
    flex-direction: column;
    transform: ${p=>p.visible? 'scaleX(1)': 'scaleX(0)'};
    transform-origin: right;
    transition: all .3s ease-in-out;
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

export const Label = styled.span`
    font-size: small;
    padding-right: 8px;
    min-width: 40px;
    color: ${p=>p.color};
`;

