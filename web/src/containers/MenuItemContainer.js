import React from 'react';
import { MenuItem } from '../components';

const MenuItemContainer = (actions, label) => {
    console.debug('here');
    console.debug(actions);
    console.debug(label);
    return (<div onClick={actions.onClick}>
        {label}
    </div>);
}

export default MenuItemContainer;