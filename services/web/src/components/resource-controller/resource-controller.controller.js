// @flow
import * as actions from './resource-controller.actions';
import * as actionsAsset from '../../store/asset/asset.actions';
import * as actionsMapping from '../../store/mapping/mapping.actions';
import * as actionsTag from '../../store/tag/tag.actions';
import * as actionsActiveDetail from '../../store/active-detail/active-detail.actions';
import * as types from '../../constants/types';
import type { Asset, Mapping, Tag } from "../../store/types";

// todo: clean up
import * as detailEditorActions from '../detail-editor/detail-editor.actions';

const formActions = (dispatch) => ({
    [types.ASSET]: {
        post: (asset: Asset) => dispatch(actionsAsset.postAsset(asset)),
        put: (asset: Asset) => dispatch(actionsAsset.updateAsset(asset)),
        remove: (name: string) => dispatch(actionsAsset.deleteAsset(name)),
        parseForm: (form) => ({
            name: form.name,
            description: form.description,
            connected_to: form.resources,
            tags: form.tags,
            group: form.group,
            shape: form.shape,
            color: form.color,
        })
    },
    [types.MAPPING]: {
        post: (mapping: Mapping) => dispatch(actionsMapping.postMapping(mapping)),
        put: (mapping: Mapping) => dispatch(actionsMapping.updateMapping(mapping)),
        remove: (name: string) => dispatch(actionsMapping.deleteMapping(name)),
        parseForm: (form) => ({...form, assets: form.resources}),
    },

    [types.TAG]: {
        post: (tag: Tag) => dispatch(actionsTag.postTag(tag)),
        put: (tag: Tag) => dispatch(actionsTag.updateTag(tag)),
        remove: (name: string) => dispatch(actionsTag.deleteTag(name)),
        parseForm: (form) => ({
            name: form.name,
            description: form.description
        })
    }
});


function mapStateToProps(state, props) {
    return {
        activeDetail: state.activeDetail,
        description: state.detailForm.description,
        name: state.detailForm.name,
        types: types,
        formEdit: state.app.form.edit,
        formType: state.detailForm.formType,
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
        // todo: to be refactored
        setAssetFilterValue: (value: string) => dispatch(detailEditorActions.onAssetFilterChange(value)),
        setTagFilterValue: (value: string) => dispatch(detailEditorActions.onTagFilterChange(value)),
        setResourceNameValue: (value: string) => dispatch(detailEditorActions.onResourceNameChange(value)),
        setResourceDescriptionValue: (value: string) => dispatch(detailEditorActions.onResourceDescriptionChange(value)),
        addAssetToSelected: (value: string) => dispatch(detailEditorActions.addAssetToSelected(value)),
        addTagToSelected: (value: string) => dispatch(detailEditorActions.addTagToSelected(value)),
        removeAssetFromSelected: (value: string) => dispatch(detailEditorActions.removeAssetFromSelected(value)),
        removeTagFromSelected: (value: string) => dispatch(detailEditorActions.removeTagFromSelected(value)),
    }
}

export default {
    mapStateToProps: (state, props) => mapStateToProps(state, props),
    dispatchToProps: (dispatch) => dispatchToProps(dispatch),
}