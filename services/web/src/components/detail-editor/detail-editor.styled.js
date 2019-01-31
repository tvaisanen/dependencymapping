import styled from 'styled-components';


export const EditorGrid = styled.div`
  display: grid;
  grid-template:
  "resource-selection resource-details list-selection" 1fr
  / 16em 3fr 2fr;
  grid-gap: 4px;
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
    /*background-color: ${p=>p.theme.cardBackgroundColor}; */
    border-radius: 3px;
    border-right: ${p=>p.theme.cardBorder}; 
    background-color: rgba(255,255,255,0.1);
`;


export const ResourceDetails = styled.div`
    grid-area: resource-details;
    margin: 4px 0;
    max-height: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`;

export const ListSelection = styled.div`
    grid-area: list-selection;
    display: flex;
    flex-direction: column;
    transition: all 2s ease-in-out;
    border-left: ${p=>p.theme.cardBorder}; 
    width: 100%;
    height: 100%;
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

export const InflateGridCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1; 
  background: rgba(22,22,22,0.5);
  font-weight: bold;
  letter-spacing: 0.05rem;
`;
