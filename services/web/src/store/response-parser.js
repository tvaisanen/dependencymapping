import {ASSET} from "../constants";

export function parseHALResponseData(resourceType, data){
    console.group("parseHALResponseData()");
    console.info(data);
    console.groupEnd()


    return HALResourceParser[resourceType](data);
}

const HALResourceParser = {
    ASSET: parseHALAsset
};

function parseHALAsset(data){

    alert(JSON.stringify(data))
   return {
       _id: data._id,
       name: data.name,
       description: data.description,
       connected_to: data._embedded.connected_to.map(o => o.name),
       tags: data._embedded.tags.map(o => o.name),
       group: data._embedded.group.name,
       nodeColor: data.nodeColor,
       nodeShape: data.nodeShape,
   }
}