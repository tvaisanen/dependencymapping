//@flow

export type Tag = {
    name: string,
    description: {type: string, default: ""}
}

export type TagState = Array<Tag>;