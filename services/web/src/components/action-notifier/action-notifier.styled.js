import styled from 'styled-components';

export const Anchor = styled.div`

  display: flex;
  position: relative;
  z-index: 2;
  justify-content: flex-start;
  width: 100%;
  height: 0; 
  
  > * {
    visibility: ${p => p.visible ? "visible" : "hidden"};
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 12px;
  flex-grow: 1;
  border: 1px solid grey;
  position: relative;
  height: min-content;
  color: rgba(255,255,255,1);
  letter-spacing: 0.06rem;
  font-size: small;
  background-color: rgba(20,20,20,0.5); 
`;

export const CancelBtn = styled.div`

  font-size: small;
  letter-spacing: 0.04rem;
  cursor: pointer;
  
  :hover{
    color: red; 
  }
`;

export const Notification = styled.div`
    letter-spacing: 0.04rem;
`;

export const ActionText = styled.span`
  color: #005788;
  cursor: pointer;
  :hover {
    color: #116899;
  }
`;