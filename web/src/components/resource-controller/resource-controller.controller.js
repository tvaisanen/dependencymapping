import * as actions from './resource-controller.actions';
import * as actionsResource from '../../actions/resource.actions';
import * as actionsMapping from '../../actions/mapping.actions';
import * as actionsTag from '../../actions/tag.actions';
import * as actionsActiveDetail from '../../actions/active-detail.actions';
import * as types from '../../constants/types';

const formActions = (dispatch) => ({
    [types.ASSET]: {
        post: (asset) => dispatch(actionsResource.postResource(asset)),
        put: (asset) => dispatch(actionsResource.updateResource(asset)),
        remove: (asset) => dispatch(actionsResource.deleteResource(asset)),
        parseForm: (form) =>({
                name: form.name,
                description: form.description,
                connected_to: form.resources,
                tags: form.tags
            })
    },
    [types.MAPPING]: {
        post: (mapping) => dispatch(actionsMapping.postMapping(mapping)),
        put: (mapping) => dispatch(actionsMapping.updateMapping(mapping)),
        remove: (mapping) => dispatch(actionsMapping.deleteMapping(mapping)),
        parseForm: (form) => form,
    },

    [types.TAG]: {
        post: (tag) => dispatch(actionsTag.postTag(tag)),
        put: (tag) => dispatch(actionsTag.updateTag(tag)),
        remove: (tag) => dispatch(actionsTag.deleteTag(tag)),
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
        clearActiveDetail: () => dispatch(actionsActiveDetail.clearActiveDetail()),
        closeEdit: () => dispatch(actions.closeEdit()),
        closeFormAndSetActiveDetail: (detail) => dispatch(
            actions.closeFormAndSetActiveDetail(detail)
        ),
    }
}

//   updateMapping: (mapping) => dispatch(actions.updateMapping(mapping)),
//   postMapping: (mapping) => dispatch(actions.postMapping(mapping)),
//   deleteMapping: (mapping) => dispatch(actions.deleteMapping(mapping)),
export default {
    mapStateToProps: (state, props) => mapStateToProps(state, props),
    dispatchToProps: (dispatch) => dispatchToProps(dispatch),
}