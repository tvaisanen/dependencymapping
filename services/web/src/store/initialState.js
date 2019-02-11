import * as types from '../constants/types';
import * as views from '../constants/views';

export default {
    app: {
        info: "Initial info message",
        bottomPanel: {
            view: views.CREATE,
            tabItems: [
                {label: 'Resource Browser', view: views.BROWSE},
                {label: 'Create', view: views.CREATE},
                //{label: 'Connections', view: views.CONNECTIONS}
            ]
        },
        form: {
            edit: false,
            type: types.MAPPING
        },
        graph: {
            selectedLayout: 'cola'
        },
        showCollapseMenu: false,
    },
    mappings: [],
    dependencies: [],
    resources: [],
    tags: [],
    activeMapping: {name: "no selection", assets:[], tags: []},
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

