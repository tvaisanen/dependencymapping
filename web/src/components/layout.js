import styled from 'styled-components';

//const colorDark = "rgb(36,36,42)";
const colorDark = "rgb(45, 45, 57)";
const mediumDark ="#4d4c4c";


export const Layout = styled.div`
    display: flex;
    flex-direction: column;
    background: rgb(54, 48, 54);
    flex-grow: 1;
    height: 100vh;
    overflow: hidden;
`;

export const TopBar = styled.div`
    background: ${colorDark};
    display: flex;
    flex-direction: row;
   
    color: #FAFAFA;
    font-size: larger;
    font-weight: bold;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
`;

export const LayoutRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: ${props=>props.justify};
    align-items: ${props=>props.align};
    height: ${props=>props.height? props.height: 'inherit'};
`;

export const LayoutCol = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: ${props=>props.justify};
    align-items: ${props=>props.align};
    height: ${props=>props.height};
    width: ${props=>props.width};
    flex-grow: ${props=>props.grow};
`;



export const SidePanel = styled.div`
    background: ${mediumDark};
    display: flex;
    flex-direction: column;
    width: 320px;
    min-height: inherit;
    min-width: 20vw;
    max-width: ${props=>props.max};
    height: auto;
    overflow: ${props => props.buttons ? 
        'hidden' : 'scroll'
    };
    overflow-x: hidden;
`;


export const ButtonPanel = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    opacity: ${props=>props.visible?1:0};
    transform: ${props=>props.visible? 'scaleY(1)' : 'scaleY(0)'};
    transform-origin: top center;
    right: 12px;
    background: transparent;
    width: auto;
    min-height: inherit;
    height: auto;
    overflow: hidden;
    overflow-x: hidden;
    transition: all .2s ease-in-out;

`;

export const FloatingButton = styled.button`
    border-radius: 3px;
    border: none;
    padding: 1em 0.5em;
    background: rgba(36,36,42, 0.5);
    margin: .5em;
    cursor: pointer;
    color: white;
    font-weight: bold;
    font-size: small;
`;

export const SidePanelTabs = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background: ${colorDark};
    position: sticky;
    top: 30px;

`;

export const SidePanelTabButton = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: rgba(36,36,42, 0.8);
    color: white;
    text-align: center;
    font-weight: bold;
    padding: 6px 15px;
    margin: 4px;
    border-radius: 3px;
`;


export const SidePanelContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: ${props => 
        props.collapsed ? 
        '0' : 
        'auto'
    };
    transform: ${props => 
        props.collapsed ? 
        'scale(1,0)' : 
        'scale(1,1)'
    };
    visibility:
    transition: all 1s ease-in;
    padding: 4px 0;
    margin: 6px;

`;

export const ContentWindow = styled.div`
    width: 100%;
    height: 100%;
    background: white;
`;


export const PanelTitle = styled.label`
`;

export const SidePanelMenu = styled.div`
    resize: vertical;

    `;


export const MenuItem = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: ${props=>props.jusfity};
    background: #F5F5F5;
    padding: 2px;
    border: solid 3px grey;
    cursor: pointer;

    :hover{
        border-color: ${colorDark}; 
    }

    transition: all .1s ease-in-out;   


`;

export const MenuRadioToggle = styled.input`
`;

export const MenuItemLabel = styled.span`
    margin-left: 6px;
 
`;

export const MenuHeader = styled.span`
    background: rgba(36,36,42, 0.8);
    color: white;
    text-align: center;
    font-weight: bold;
    
    padding: 6px 15px;
    margin: 4px;
    border-radius: 3px;
    text-transform: capitalize;
    border-bottom: solid 2px grey;
`;

export const ResourceDetail = styled.div`

    height: 40vh;
    color: rgba(255,255,255,0.9);
    padding: 6px 12px;
    font-size: large;
    font-weight: bold;
    background: rgb(54, 48, 54);
    width: ${props=>props.width? props.width : '50em'};
`;

export const ResourceDescription = styled.div`
    display: flex;
    flex-direction: column;
    background: ${props=>props.edit? 'rgba(244,244,244,.2)':'transparent'};
    padding: 12px;
    border-radius: 4px;
`;
    /*background: rgb(50, 46, 50);*/

export const PanelHeaderTitle = styled.span`
    
    text-transform: capitalize;
    border-bottom: solid 2px transparent;
    :hover {
        border-color: grey;
    }

    cursor: pointer;
`;

export const PanelAddBtn = styled.span`
    border: solid 2px transparent;
    border-radius: 2px;
    padding: 0 4px;
    :hover {
        border-color: grey;
    }

    cursor: pointer;
`;

export const PreviewAndForms = styled.div`

`;

export const BottomPanelContent = styled.div`
    display: flex;
    justify-content: center;
    background: #fafafa;
    padding: 12px;
    border-radius: 5px;
    height: inherit;
    width: 80vw;
    color: rgb(45, 45, 57);
`;