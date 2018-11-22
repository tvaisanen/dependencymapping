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
                listItems.map((listItem, i) => (
                    <s.ListItem
                        selected={selected === listItem}
                        darkButtons={darkButtons}
                        key={i}
                        onClick={() => onItemClick(listItem)}
                        onMouseOver={onMouseOver ? () => onMouseOver(listItem) : null}
                        onMouseOut={onMouseOut ? () => onMouseOut(listItem) : null}
                    >
                        {listItem}
                    </s.ListItem>)
                )
                : null
            }
        </s.ScrollContent>
    </s.SidePanelMenu>
);


