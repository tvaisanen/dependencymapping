import * as types from './graph.action-types';
import initialState from '../../reducers/initialState';
import cytoscape from 'cytoscape';
import {graphStyle} from '../../configs/configs.cytoscape';
import cxtmenu from 'cytoscape-cxtmenu';
import cola from 'cytoscape-cola';

cytoscape.use(cola);
cytoscape.use(cxtmenu);

export default function graphReducer(cy = initialState.graph, action){

    switch(action.type){
        case types.INIT_GRAPH:
            return newGraphInstance({...action}); // action.eventHandlers

        default:
            return cy;
    }
}

const newGraphInstance = ({eventHandlers}) => {
    const cy = cytoscape({
        container: document.getElementById('cy'),
        elements: [],
        style: graphStyle,
        layout: {
            name: 'cola',
        }
    });

    Object.keys(eventHandlers).forEach(key => {
       const selector = eventHandlers[key][0];
       const handler = eventHandlers[key][1];
       cy.on(key, selector, handler);
    });

    return cy;
    //eventHandlers.map(event => cy.on(`${event}`))


    //cy.on('tap', 'node', this.onNodeClick);
    //cy.on('mouseover', 'node', events.onNodeMouseOver);
    //cy.on('mouseout', 'node', events.onNodeMouseOut);
    //cy.on('cxttap', 'node', events.onCtxClick);

    //const layout = graphInstance.layout({name: 'cola'});
   // layout.run();
    //this.setState({cy: cy});
    /*
    cy.cxtmenu({
        selector: 'node', // elements matching this Cytoscape.js selector will trigger cxtmenus
        commands: [
            {
                content: 'remove',

                contentStyle: {},
                select: function (ele) {
                    alert("remove element: " + ele.id() + " from active map!")
                    //this.props.removeResourceFromActiveMapping(resource);
                    graphHelpers.removeElement(cy, ele.id());
                },
                enabled: true
            },
            { // example command
                content: 'Connect', // html/text content to be displayed in the menu
                contentStyle: {}, // css key:value pairs to set the command's css in js if you want
                select: function (ele) { // a function to execute when the command is selected
                    alert("connect element: " + ele.id() + " to ....!") // `ele` holds the reference to the active element
                },
                enabled: true // whether the command is selectable
            },
        ]
    });
    cy.cxtmenu({
        selector: 'core',

        commands: [
            {
                content: 'create asset',
                select: function () {
                    console.log('bg1');
                }
            }
        ]
    });*/
};
        /*

        const layout = cy.layout({name: LAYOUT});
        layout.run();
        this.setState({cy: cy});

        cy.cxtmenu({
            selector: 'node', // elements matching this Cytoscape.js selector will trigger cxtmenus
            commands: [
                {
                    content: 'remove',

                    contentStyle: {},
                    select: function (ele) {
                        alert("remove element: " + ele.id() + " from active map!")
                        //this.props.removeResourceFromActiveMapping(resource);
                        graphHelpers.removeElement(cy, ele.id());
                    },
                    enabled: true
                },
                { // example command
                    content: 'Connect', // html/text content to be displayed in the menu
                    contentStyle: {}, // css key:value pairs to set the command's css in js if you want
                    select: function (ele) { // a function to execute when the command is selected
                        alert("connect element: " + ele.id() + " to ....!") // `ele` holds the reference to the active element
                    },
                    enabled: true // whether the command is selectable
                },
            ]
        });
        cy.cxtmenu({
            selector: 'core',

            commands: [
                {
                    content: 'create asset',
                    select: function () {
                        console.log('bg1');
                    }
                }
            ]
        });

        this.addResourceToMapping = this.addResourceToMapping.bind(this);
        */