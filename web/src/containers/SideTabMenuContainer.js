import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { 
    SidePanelMenu,
    SidePanelTabButton,
    SidePanelContentContainer
} from '../components/';
import styled from 'styled-components';


class SideTabMenuContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            collapsed: false,
            enterNewItem: false,
        }
        this.toggleMenuVisibility = this.toggleMenuVisibility.bind(this);
        this.showItemForm = this.showItemForm.bind(this);
        this.onCreateNewItem = this.onCreateNewItem.bind(this);
     
    }

    toggleMenuVisibility(){
        this.setState({collapsed: !this.state.collapsed})
    }

    showItemForm(){

        this.setState({enterNewItem: true})

        const clearInputFocus = (e) => {
            // if clicked form do nothing

            if ( e.target.parentElement.parentElement !== this.form ){
                // if clicked outside the form hide the form                    
                this.setState({enterNewItem: false})
                console.info('clear input focus');
                window.removeEventListener('click', clearInputFocus);
            }

        }

        setTimeout(()=>window.addEventListener('click', clearInputFocus), 300);


    }
    
    onCreateNewItem(){
        console.info('create new ' + this.input.value);

        try {
            this.props.onCreateNewItem(this.input.value)
        } catch (e) {console.warn(e)}
    }

    render(){
        // console.info(this.props);
        const collapsed = this.state.collapsed;
        const { listItems, onItemClick } = this.props;
        return (
            <SidePanelMenu>
                { this.props.noHeaderBlock ? null :
                <SidePanelTabButton >
                    <PanelHeaderTitle>
                        {this.props.title}
                    </PanelHeaderTitle>

                </SidePanelTabButton>
                }


                {this.props.resources ?
                     <SidePanelContentContainer collapsed={collapsed}>
                        {listItems ?
                            listItems.map((item, i) => <ResourceListItem key={i}
                                                                 onClick={onItemClick ? () => onItemClick(item) : () => alert('no action')}>
                                {item}
                            </ResourceListItem>)
                            : null}

                    </SidePanelContentContainer>
                    :
                    <SidePanelContentContainer collapsed={collapsed}>
                        {listItems ?
                            listItems.map((item, i) => <MenuItem key={i}
                                                                 onClick={onItemClick ? () => onItemClick(item) : () => alert('no action')}>
                                {item}
                            </MenuItem>)
                            : null}

                    </SidePanelContentContainer>
                }
            </SidePanelMenu>
      );
    }
}

export default SideTabMenuContainer;


SideTabMenuContainer.propTypes = {
    onItemClick: PropTypes.func,
    createNewListItem: PropTypes.func
};

export const PanelHeaderTitle = styled.div`
    
    text-center: center;
    text-transform: capitalize;
    border-bottom: solid 2px transparent;

`;


export const MenuItem = styled.div`
    text-align: center;
    font-size: small;
    
    background: #F5F5F5;
    padding: 2px;
    border-top: 2px solid rgba(54, 48, 54);
    border-bottom: 2px solid rgba(54,48,54);
    
    cursor: pointer;

    :hover{
        background-color: rgba(255,255,255,0.8); 
    }

    transition: all .15s ease-in-out;   
`;

const ResourceListItem = styled.div`
    color: rgba(255,255,255,0.9);
    font-size: small;
    text-align: center;
    padding: 2px;
    cursor: pointer;
    margin: 2px 0;
    width: 100%;
    border-radius: 3px;
    background: ${props => props.selected ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)'};
    :hover{
        background: rgba(255,255,255, 0.35);
    }
    transition: all .15s ease-in-out;   
`;