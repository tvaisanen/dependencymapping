import React from 'react';
import ReactTestUtils, {Simulate} from 'react-dom/test-utils';
import TestRenderer from 'react-test-renderer';
import {ListItem} from '../components/resource-detail.styled';
import {ListItems} from '../components/resource-detail.components';

const clickHandler = ({item, type}) => ({item, type})

it('resource detail list item should call the clickhandler on click', () => {
    const item = {name: "item name"};
    const type = "type";
    const expected = {item, type};
    const testRenderer = TestRenderer.create(
        <ListItem
            onClick={() => (
            clickHandler({
                item,
                type
            })
        )}
        > {item.name}</ListItem>
    );
    const testInstance = testRenderer.root;
    const clickHandlerResult = testInstance.props.onClick();

    expect(clickHandlerResult).toEqual(expected);
    expect(testInstance.props.children[1]).toEqual(item.name);
});

it('ListItems should render list of list items', () => {
    const type = "type";
    const items = [
        {name:"name one"},
        {name:"name two"}
    ]

    const testRenderer = TestRenderer.create(
        <ListItems
            items={items}
            type={type}
            clickHandler={clickHandler}
        />
    )

    const testInstance = testRenderer.root;

    const json = testRenderer.toJSON();
    expect(json[0].children[0]).toEqual(items[0].name);
    expect(json[1].children[0]).toEqual(items[1].name);

});

it('ListItems should return null if no items in items prop', () => {
    const items = [];
    const type = "type";
    const testRenderer = TestRenderer.create(
        <ListItems
            items={items}
            type={type}
            clickHandler={clickHandler}
        />
    )

    expect(testRenderer.toJSON()).toBe(null);
})