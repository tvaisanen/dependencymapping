import { required } from './required';
import * as helpers from './graph-helpers';

export function onNodeMouseOver(event){
    event.target.neighborhood()
        .forEach(e => e.toggleClass('highlight', true));
}

export function onEdgeHover(event) {
    console.info("edgehover")
}

export function onNodeMouseOut(event) {
     event.target.neighborhood()
        .forEach(e => e.toggleClass('highlight', false));
}

export function onNodeClick({target, cy, targetNames}) {
    console.info("click")
    console.info(targetNames);

    const nodesToCreate = helpers.createNodeElements({
        ids: targetNames
    });

    const edgesToCreate = helpers.createEdgeElementsBetween({
        source: target.id(),
        targets: targetNames
    });

    console.info(edgesToCreate);
    helpers.addElements(cy, nodesToCreate);
    helpers.addElements(cy, edgesToCreate);
    helpers.updateLayout(cy);


}

export function onEdgeClick(event) {
    console.info("")
}
