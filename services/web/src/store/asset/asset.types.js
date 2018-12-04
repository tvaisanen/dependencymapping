export type Asset = {
    name: string,
    description: string,
    connected_to: { type: Array<string>, default: [] },
    tags: { type: Array<string>, default: [] },
    group: string,
    nodeShape: string,
    nodeColor: string
}

export type AssetState = {

}