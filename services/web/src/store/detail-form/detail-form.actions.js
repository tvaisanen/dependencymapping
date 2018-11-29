import { ASSET, MAPPING, TAG } from "../../constants";
import {
    SET_DETAIL_FORM_TYPE, SET_RESOURCE_FILTER_VALUE
} from './detail-form.action-types';


export function setDetailFormType(type: ASSET | MAPPING | TAG){
    return {type: SET_DETAIL_FORM_TYPE, formType: type }
}

export function setResourceFilterValue(value: string){
    return {type: SET_RESOURCE_FILTER_VALUE, value};
}