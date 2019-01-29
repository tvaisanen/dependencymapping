import * as actionsAsset from '../../store/asset/asset.actions';
import * as actionsConnection from '../../store/connection/connection.actions';
import * as actionsMapping from '../../store/mapping/mapping.actions';
import * as actionsTag from '../../store/tag/tag.actions';
import * as types from '../../constants/types';

export class DetailForm {
    constructor(detailForm) {
        this.form = getForm[detailForm.formType](detailForm);
        this.formType = detailForm.formType;
        this.method = detailForm.edit ? 'put' : 'post';
    }
}

type FormProps = {
    name: string,
    description: string,
    selectedAssets: Array<string> | void,
    selectedTags: Array<string> | void,
    group: string | void,
    nodeShape: string | void,
    nodeColor: string | void,
    source: string,
    target: string,
    sourceArrow: boolean,
    targetArrow: boolean,
    edgeLabel: string,
}

export const typeToActionMap = {
    [types.ASSET]: {
        post: actionsAsset.postAsset,
        put: actionsAsset.updateAsset,
        delete: actionsAsset.deleteAsset
    },
    [types.CONNECTION]: {
        post: actionsConnection.postConnection,
        put: actionsConnection.updateConnection,
        delete: actionsConnection.deleteConnection,
    },
    [types.MAPPING]: {
        post: actionsMapping.postMapping,
        put: actionsMapping.updateMapping,
        delete: actionsMapping.deleteMapping,
    },
    [types.TAG]: {
        post: actionsTag.postTag,
        put: actionsTag.updateTag,
        delete: actionsTag.deleteTag,
    }
};

export function collectFormData(detailForm) {
    return new DetailForm(detailForm);
}

export const getForm = {
    ASSET: (detailForm: FormProps) => ({
        name: detailForm.name,
        description: detailForm.description,
        connected_to: detailForm.selectedAssets,
        tags: detailForm.selectedTags,
        group: detailForm.group,
        nodeShape: detailForm.nodeShape,
        nodeColor: detailForm.nodeColor
    }),
    CONNECTION: (detailForm: FormProps) => ({
        source: detailForm.source.name ? detailForm.source.name : detailForm.source,
        target: detailForm.target.name ? detailForm.target.name : detailForm.target,
        description: detailForm.description,
        tags: detailForm.selectedTags,
        edgeLabel: detailForm.edgeLabel,
        sourceArrow: detailForm.sourceArrow,
        targetArrow: detailForm.targetArrow,
    }),
    MAPPING: (detailForm) => ({
        name: detailForm.name,
        description: detailForm.description,
        assets: detailForm.selectedAssets,
        tags: detailForm.selectedTags,
    }),
    TAG: (detailForm) => ({
        name: detailForm.name,
        description: detailForm.description,
    }),
};