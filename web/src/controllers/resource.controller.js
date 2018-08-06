import * as types from '../constants';
import { getAllResourcesWithTag } from "../common/resource-helpers";

function getResourceDetailProps(state) {
    console.info("get resource detail props");
    console.info(state);
    const {
        detailType,
        activeDetail,
        setDetail
    } = state;

    console.info(JSON.stringify(activeDetail));
    console.info(types.TAG);
    const items = activeDetail.type === types.TAG ?
        getAllResourcesWithTag({tagId: activeDetail.data.name, resources: state.resources})
        : false;


    const lists = getLists({activeDetail, detailType, setDetail, items});


    return {...state, lists}
}

export const resourceCtrl = {
    getResourceDetailProps: (state, props) => getResourceDetailProps(state, props)
}

const getLists = ({activeDetail, setDetail, items}) => {
    return listCompositionInstructions[activeDetail.type].map(data => ({
            label: data.label,
            onClick: setDetail,
            items: data.key ? activeDetail.data[data.key] : items,
            type: data.type
        })
    );
};


const listCompositionInstructions = {
    /**
     * Define what keys are listed in the detail view
     *
     * label: List title
     * key: { key: [...values] }
     * type: type of the listed items
     *
     * */
    [types.ASSET]: [
        {label: "Tags", key: "tags", type: types.TAG},
        {label: "Connections", key: "connected_to", type: types.ASSET}
    ],
    [types.MAPPING]: [
        {label: "Tags", key: "tags", type: types.TAG},
        {label: "Resources", key: "resources", type: types.ASSET}
    ],
    [types.TAG]: [
        {label: "Resources", key: false, type: types.ASSET}
    ],
    [types.EMPTY]: [],
};
