import * as actions from '../../actions';
import * as types from '../../constants/types';

const formActions = (dispatch) => ({
    doAction: (func, args) => func(args),
    [types.ASSET]: {
        post: (asset) => dispatch(actions.postResource(asset)),
        put: (asset) => dispatch(actions.updateResource(asset)),
        remove: (asset) => dispatch(actions.deleteResource(asset)),
        parseForm: (form) =>({
                name: form.name,
                description: form.description,
                connected_to: form.resources,
                tags: form.tags
            })
    },
    [types.MAPPING]: {
        post: (mapping) => dispatch(actions.postMapping(mapping)),
        put: (mapping) => dispatch(actions.updateMapping(mapping)),
        remove: (mapping) => dispatch(actions.deleteMapping(mapping)),
        parseForm: (form) => form,
    },

    [types.TAG]: {
        post: () => alert("post tag"),
        put: () => alert("put tag"),
        remove: () => alert("delete tag"),
        parseForm: (form) => ({
            name: form.name,
            description: form.description
        })
    }
});



function mapStateToProps(state, props) {
    console.info(props);
    console.info(state);
    return {
        activeDetail: state.activeDetail,
        types: types,
        formEdit: state.app.form.edit,
        formType: state.app.form.type,
        assetNameList: state.resources.map(r => r.name),
        tagNameList: state.tags.map(t => t.name)
    }
}

function dispatchToProps(dispatch) {
    return {
        formActions: formActions(dispatch),
        clearActiveDetail: () => dispatch(actions.clearActiveDetail()),
        cancelEdit: () => dispatch(actions.cancelEdit()),
        closeFormAndSetActiveDetail: (detail) => dispatch(
            actions.closeFormAndSetActiveDetail(detail)
        )
    }
}

//   updateMapping: (mapping) => dispatch(actions.updateMapping(mapping)),
//   postMapping: (mapping) => dispatch(actions.postMapping(mapping)),
//   deleteMapping: (mapping) => dispatch(actions.deleteMapping(mapping)),
export default {
    mapStateToProps: (state, props) => mapStateToProps(state, props),
    dispatchToProps: (dispatch) => dispatchToProps(dispatch),
}