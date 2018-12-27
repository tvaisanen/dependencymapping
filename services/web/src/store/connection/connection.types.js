
export type Connection = {
    source: string,
    target: string,
    tags: Array<string>,
    description: string,
    sourceArrow: boolean,
    targetArrow: boolean,
    edgeLabel: string
}

export type ConnectionAction = {
    type: string,
    connection: Connection,
    connections: Array<Connection>
}

export type ConnectionState = Array<Connection>;