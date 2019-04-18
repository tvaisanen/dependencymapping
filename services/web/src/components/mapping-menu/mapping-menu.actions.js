import * as views from '../../constants/views';
import * as activeDetailActions from '../../store/active-detail/active-detail.actions'
import * as dependencyMapHelpers from '../../store/active-mapping/active-mapping.utils';
import {setBottomPanelView, showBottomPanel} from "../../store/ui/ui.actions";
import { setAsActiveDetail } from "../../store/active-detail/active-detail.actions";
import { MAPPING } from "../../constants";

export function onMappingItemClick(mappingName){
    return function(dispatch, getState){
        const { activeMapping, mappings, app:{ bottomPanel } } = getState();

        if (activeMapping.name !== mappingName){
            dispatch(dependencyMapHelpers.loadDependencyMap(mappingName));
        }

        // Set mapping as active.
        const mapping = mappings.filter(m => m.name === mappingName)[0];

        dispatch(activeDetailActions.setAsActiveDetail({
                data: mapping,
                type: MAPPING
            })
        );
        dispatch(setBottomPanelView(views.BROWSE));

        if (!bottomPanel.visible){
            dispatch(showBottomPanel());
        }
    }
}

export function setActiveDetail(activeDetail){
    return function (dispatch) {
        dispatch(activeDetailActions.setActiveDetail(activeDetail));
    }
}

export function onActiveAssetClick(activeDetail){
    return function (dispatch, getState){

        const { assets, app:{ bottomPanel } } = getState();

        // should be only one with
        // the same name -> filter[0]
        const assetData = assets.filter(r => r.name === activeDetail.data)[0];
        const activeDetailWithData = {
           data: assetData,
           type: activeDetail.type
        };

        dispatch(setAsActiveDetail(activeDetailWithData));
        dispatch(setBottomPanelView(views.BROWSE));
        // if bottom panel collapsed open
        if (!bottomPanel.visible){
            dispatch(showBottomPanel());
        }
    }
}

export function setActiveMapping(mapping){
    return function (dispatch) {
        console.group("setActiveMapping");



        console.groupEnd();
    }
}