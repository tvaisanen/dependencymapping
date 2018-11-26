import React, { Component } from 'react';
import * as s from '../components';

class CategoryListContainer extends Component {
    constructor(props){
      super(props);
      this.state = {
        createNewCategory: false
      }
    }
  
    componentDidMount(){
      if (this.state.createNewCategory){
        // if input will be visible set focus 
        this.input.focus();
      }
    }
  
  
    showCategoryInput(){
  
      this.setState({enterNewItem: true})
  
      const clearInputFocus = (e) => {
          // if clicked form do nothing
  
          if ( e.target !== this.input ){
              // if clicked outside the form hide the form                    
              this.setState({enterNewItem: false})
              console.info('clear input focus');
              window.removeEventListener('click', clearInputFocus);
          }
  
      }
  
      setTimeout(()=>window.addEventListener('click', clearInputFocus), 300);
  
  
  }
  
    
    render(){
      if (this.input){
        this.input.focus();
      }
    
      return (
        <div style={{widht:'inherit'}}>
            
            Categories: [
            {this.props.categories ? this.props.categories.map((c, i) =><span key={i}>{c.name}, </span>): null}
            {
              this.state.createNewCategory ? 
                <span>
                  <s.Input 
                    type="text" 
                    innerRef={input=>this.input}
                    placeholder="new category.."/>✔
                  
                </span>
                : null 
  
            }]
            <br/>
            <span style={{fontSize:'.6em'}}>{JSON.stringify(this.state)}</span>
        </div>
      )
    }
  }

export default CategoryListContainer;