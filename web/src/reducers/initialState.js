import * as types from '../constants/types';
import * as views from '../constants/views';



export default {
    app: {
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
        }
    },
    mappings: [],
    dependencies: [],
    resources: [],
    tags: [],
    activeMapping: {name: 'none', resources: [], connections: []},
    activeDetail: {
        data: {
            name: 'Welcome from store',
            description: "hello",
            type: ""
        },
        type: "EMPTY"
    },
    graph: {},

}

