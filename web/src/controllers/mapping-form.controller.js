import * as actions from '../actions';

export default {
    getMappingFormProps: (props) => getProps(props),
    getDispatchedTransactions: (dispatch) => getTransactions(dispatch)
}

function getProps(props){
    return {
        resources: props.resources,
        tags: props.tags,
        mappings: props.mappings,
        tagNameList: props.tags.map(t => t.name),
        resourceNameList: props.resources.map(r => r.name)
    }
}

function getTransactions(dispatch){
    return {
        setActiveDetail: ({data, type}) => dispatch(actions.setActiveDetail({data,type})),
        updateMapping: (mapping) => dispatch(actions.updateMapping(mapping)),
        postMapping: (mapping) => dispatch(actions.postMapping(mapping)),
        deleteMapping: (mapping) => dispatch(actions.deleteMapping(mapping)),
    }
}