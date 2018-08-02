import * as helpers from './graph-helpers';

export function onNodeMouseOver(event){
    helpers.hoverIndicationOn(event.target.cy(), event.target.id());
}

export function onEdgeHover(event) {
    console.info("edgehover")
}

export function onNodeMouseOut(event) {
    helpers.hoverIndicationOff(event.target.cy(), event.target.id());
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

export function onCtxClick(event) {
    console.info("right button click");
    console.info(event);

}