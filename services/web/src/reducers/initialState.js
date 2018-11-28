import * as types from '../constants/types';
import * as views from '../constants/views';

export default {
    app: {
        info: "Initial info message",
        bottomPanel: {
            view: views.BROWSE,
            tabItems: [
                {label: 'Resource Browser', view: views.BROWSE},
                {label: 'Create', view: views.CREATE},
            ]
        },
        form: {
            edit: false,
            type: types.MAPPING
        },
        graph: {
            selectedLayout: 'cose'
        },
        showCollapseMenu: false,
    },
    mappings: [],
    dependencies: [],
    resources: [],
    tags: [],
    activeMapping: {
        name: 'none',
        grouped: [],
        assets: [],
        connections: []
    },
    activeDetail: {
        data: {
            name: 'Welcome from store',
            description: "hello",
            type: ""
        },
        type: "EMPTY"
    },
    graph: {},
    assetGroups: []

}

