import React from 'react';
import {PanelHeader, ScrollContent, ListItem, SidePanelMenu, SelectFirst} from './mapping-menu.styled'

export const Menu = (
    {title,
        listItems,
        onItemClick,
        onMouseOver,
        onMouseOut,
        darkButtons,
        selected,
        listItemType
    }) => (
    <SidePanelMenu>
        <PanelHeader>{title}</PanelHeader>
        <ScrollContent>
            {
                // this is where the list items are rendered
                // for the menu component
                listItems ?
                    listItems.map((listItem, i) => (
                        <ListItem
                            id={`list-item__${listItemType}`}
                            selected={selected === listItem}
                            darkButtons={darkButtons}
                            key={i}
                            onClick={() => onItemClick(listItem)}
                            onMouseOver={onMouseOver ? () => onMouseOver(listItem) : null}
                            onMouseOut={onMouseOut ? () => onMouseOut(listItem) : null}
                        >
                            {listItem}
                        </ListItem>)
                    )
                    : null
            }
            {
                // empty selection
                title === "no selection" ? // todo: more robust safetyguard would be in place
                    <SelectFirst>Create or select a mapping first, before adding assets.</SelectFirst>
                    :  null
            }
        </ScrollContent>
    </SidePanelMenu>
);