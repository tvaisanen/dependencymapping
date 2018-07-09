import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as c from '../components/';

import { 
    SidePanelMenu,
    SidePanelTabButton,
    SidePanelContentContainer
} from '../components/';


const LIST_ITEM_FORM_ID = "new-list-item-form";
  
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
        const resourceCount = listItems ? listItems.length : null;
        return (
            <SidePanelMenu>
                { this.props.noHeaderBlock ? null :
                <SidePanelTabButton >
                    <c.PanelHeaderTitle onClick={this.toggleMenuVisibility}>
                        {this.props.title}{resourceCount !== 0 ? ` [${resourceCount}]` : null}
                    </c.PanelHeaderTitle>

                    {/* The " + " button, which prompts the form for creating new elemenets */}    
                    <c.PanelAddBtn onClick={this.showItemForm}>+</c.PanelAddBtn>
                </SidePanelTabButton>
                }

                <c.NewListItemForm collapsed={collapsed} id={LIST_ITEM_FORM_ID} innerRef={(form) => {this.form=form}}>
                {
                    this.state.enterNewItem ? 
                    <c.MenuItem>
                        <c.ListItemInput innerRef={input => this.input = input}/>
                        <button onClick={this.onCreateNewItem}>save</button>
                    </c.MenuItem>                    
                    : null
                }
                </c.NewListItemForm>

                <SidePanelContentContainer collapsed={collapsed}>
                    {listItems ? 
                        listItems.map((item, i) => <c.MenuItem key={i} onClick={onItemClick ? ()=>onItemClick(item) : ()=>alert('no action')}>
                        <c.MenuItemLabel key={i}>{item} </c.MenuItemLabel>
                                </c.MenuItem>) 
                    : null }
                    
                </SidePanelContentContainer>
            </SidePanelMenu>
      );
    }
}

export default SideTabMenuContainer;


SideTabMenuContainer.propTypes = {
    onItemClick: PropTypes.func,
    createNewListItem: PropTypes.func
};
