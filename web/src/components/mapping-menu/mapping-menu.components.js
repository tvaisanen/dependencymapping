import React from 'react';
import PropTypes from 'prop-types';
import * as s from './mapping-menu.styled'

export const Menu = (
    {title, listItems, onItemClick, onMouseOver, onMouseOut, darkButtons, selected}) => (
    <s.SidePanelMenu>

        <s.SidePanelTabButton>
            <s.PanelHeaderTitle>
                {title}
            </s.PanelHeaderTitle>
        </s.SidePanelTabButton>
        <s.SidePanelContentContainer>
            {listItems ?
                listItems.map((item, i) => (
                    <s.ListItem
                        selected={selected === item.name}
                        darkButtons={darkButtons}
                        key={i}
                        onClick={() => onItemClick(item)}
                        onMouseOver={onMouseOver ? () => onMouseOver(item.name) : null}
                        onMouseOut={onMouseOut ? () => onMouseOut(item.name) : null}
                    >
                        {item.name}
                    </s.ListItem>)
                )
                : null
            }
        </s.SidePanelContentContainer>
    </s.SidePanelMenu>
);


