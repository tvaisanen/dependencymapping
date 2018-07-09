
import React from 'react';
import ReactDOM from 'react-dom';
import FormsContainer, { SelectForm } from '../FormsContainer';

it('FormsContainer renders correctly', () =>{
    const div = document.createElement('div');
    ReactDOM.render(
        <FormsContainer/>
    , div);
    ReactDOM.unmountComponentAtNode(div);
})

test('form selection triggers the passed function on item click', () => {
    const expected = "Return value";
    const sf = <SelectForm openForm={() => "Return value"}/>;
    expect(sf.props.openForm()).toBe(expected);
});

