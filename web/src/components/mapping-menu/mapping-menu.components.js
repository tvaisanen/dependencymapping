import React from 'react';
import * as s from './mapping-menu.styled'

export const Menu = (
    {title, listItems, onItemClick, onMouseOver, onMouseOut, darkButtons, selected}) => (
    <s.SidePanelMenu>

        <s.PanelHeader>
                {title}
        </s.PanelHeader>
        <s.ScrollContent>
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
        </s.ScrollContent>
    </s.SidePanelMenu>
);


