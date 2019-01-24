
import type { Connection as ConnectionType } from "../store/connection/connection.types";

function Connection (props: ConnectionType) {
    if (!props.source || !props.target){
        throw new Error("source and target are required for a connection.")
    }
   return {...props}
}

Connection.defaultProps = {
    tags: [],
    sourceArrow: false,
    targetArrow: true,
    edgeLabel: ""
};

class ResourceFactory {

    static newConnection (props: ConnectionType) {
       return new Connection(props);
    }
}

export default ResourceFactory;