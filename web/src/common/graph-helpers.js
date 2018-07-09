import _ from 'lodash';

const required = () => {throw new Error('Missing parameter')};

export function addElement(cy = required(), element = required()) {
    try {
        cy.add(element);
        console.info("Added element to the graph:");
        console.info(element);
    } catch (e) {
        console.error(e);
    }
}

export function addElements(cy = required(), elements = required()) {
    try {
        cy.add(elements);
    } catch (e) {
        console.error(e);
    }
}

export function updateLayout(cy = required()){
    try {
        console.debug(cy);
        const layout = cy.layout({ name: 'cola' });
        layout.run();
    } catch (e){
        console.error(e);
    }
}

export function toggleElementVisibility(cy = required(), elementId = required()){
    try {

    } catch (e){
        
    }
}

export function clearGraph(cy = required()){
    try {
        cy.elements().remove()
    } catch (e) {
        console.warn(e);
    }
}

