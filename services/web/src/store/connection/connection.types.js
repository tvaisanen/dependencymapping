
export type Connection = {
    source: string,
    target: string,
    meta: string,
    description: string
}

export type ConnectionAction = {
    type: string,
    connection: Connection,
    connections: Array<Connection>
}

export type ConnectionState = Array<Connection>;