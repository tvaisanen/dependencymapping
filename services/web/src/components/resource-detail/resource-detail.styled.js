import styled from 'styled-components';

export const DetailLayout = styled.div`
    // detail layout
    display: flex;
    height: 100%;
    width: inherit;
    flex-grow: 3;
    border-radius: 3px;
    border: 1px solid grey;
    
    > div {
       display: flex;
       flex-direction: column;
       flex-grow: 1;
       
       > div:nth-of-type(1) {
         // detail title bar               
         justify-content: space-between;
         background-color: rgba(22,22,22, 0.5);
         padding: 0 6px;
        
       }
       
       > div:nth-of-type(2){
          // content boxes
          margin: 4px;
          border: 1px solid rgba(255,255,255,0.15);
       }
    }
    
    
    > div:nth-of-type(1) {
      // header
      flex-basis: 60%;
    
    > div:nth-of-type(2) {
      // header
      flex-basis: 40%;
    }
`;


export const HeaderBar = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    letter-spacing: 0.05rem;
    height: 1.2em;
`;

export const ListBlock = styled.div`
    display: flex; 
    flex-direction: row;
    margin-left: 6px;
    min-width: 200px;
    flex-grow: 1;
    border-radius: 3px;
    border: 1px solid grey;
    height: inherit;
    max-height: inherit;
    overflow: hidden;
`;

export const ListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: auto;
    min-width: 100px;
    min-height: 20px;
    flex-grow: 1;
    flex-basis: 50%;
    flex-shrink: 1;
    //border: 1px solid grey;
    overflow-y: auto;
   background-color: rgba(60,63,65,0.35) 
`;
export const DetailHeader = styled.h2`
   padding: 0;
   margin: 4px 0;
   color: rgba(255,255,255,0.9);
`;

export const List = styled.div`
    flex-direction: column;
    overflow-y: auto;
    margin: 0 4px;
    padding: 6px 0;
    flex-grow:1;
`;

export const ListLabel = styled.div`
    text-align: center;
    font-size: small;
    color: rgba(255,255,255,0.9);
    background-color: rgba(25,25,25, 0.5);
    padding: 4px;
    border-bottom: 1px solid rgba(255,255,255,.2);
    height: 1.2em;
    letter-spacing: 0.07rem;
`;




export const ListItem = styled.div`
    font-size: small;
    letter-spacing: 0.07em;
    text-align: center;
    // background-color: rgba(255,255,255,0.2);
    background-color: rgba(22,22,22, 0.5);
    padding: 2px;
    margin: 2px 0; 
    border-radius: 3px; 
    box-shadow: 0 0 2px rgba(255,255,255,0.1);
    :hover {
      background-color: rgba(255,255,255,0.1);
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

export const ActionLink = styled.small`
    width: 100px;
    color: rgba(255,255,255,0.8);
    border-bottom: 2px solid transparent;
    padding: 0 20px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    :first-of-type{
       border-left: none;
    }

    :hover {
      color: rgba(255,255,255,.6);
    }
    cursor: pointer;
`;
