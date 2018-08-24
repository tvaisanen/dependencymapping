import * as types from '../constants/types';
import * as views from '../constants/views';

const instructions = "\
Please fill out the survey after finishing the task [Survey](https://in.hotjar.com/s?siteId=986690&surveyId=103836)\n\
\n\
# create resource\n\
\n\
* Click 'create' tab in the browser view\n\
* Select resource type, fill the form.\n\
* Press save.\n\
\n\
# edit resource / create connection / add tag\n\
\n\
* Select resource from the list \n\
* Press edit from the top right corner of the detail view\n\
* Select connected assets from the list\n\
* Select tags\n\
\n\
# edit mapping\n\
\n\
* Click the mapping item in top left mappings list\n\
* Click the edit in the top right corner of the detail view."

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
            description: instructions,
            type: ""
        },
        type: "EMPTY"
    },
    graph: {},

}

