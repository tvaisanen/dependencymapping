// use to load active detail
// into the detailForm state
// when editing a detail
import type {Asset, Connection, Mapping, Tag} from "../types";

export const detailToFormMapping = {
    ASSET: (asset: Asset) => ({
        name: asset.name,
        description: asset.description,
        selectedAssets: asset.connected_to.map(asset => asset.name),
        selectedTags: asset.tags.map(tag => tag.name),
        group: asset.group,
        nodeColor: asset.nodeColor,
        nodeShape: asset.nodeShape
    }),
    MAPPING: (mapping: Mapping) => ({
        name: mapping.name,
        description: mapping.description,
        selectedAssets: mapping.assets.map(asset => asset.name),
        selectedTags: mapping.tags.map(tag => tag.name),
    }),
    TAG: (tag: Tag) => ({
        name: tag.name,
        description: tag.description
    }),
    CONNECTION: (connection: Connection) => ({
        ...connection,
        selectedTags: connection.tags.map(t => t.name)

    })
};

