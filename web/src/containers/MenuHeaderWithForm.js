import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as c from '../components/';

class MenuHeaderWithForm extends Component {
    render() {
        return (
            <div>
                <c.MenuHeader>{this.props.title}</c.MenuHeader>
            </div>
        );
    }
}

MenuHeaderWithForm.propTypes = {

};

export default MenuHeaderWithForm;