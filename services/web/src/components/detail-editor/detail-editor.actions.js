import { ASSET, MAPPING, TAG } from "../../constants";
import type {Dispatch} from "../../store/types";

import * as detailFormActions from '../../store/detail-form/detail-form.actions';

export function clickDetailType (type: ASSET | TAG | MAPPING): Dispatch {
    return function (dispatch: Dispatch): void {
        dispatch(detailFormActions.setDetailFormType(type));
    }
}

export function onResourceFilterChange (value: string): Dispatch {
    return function (dispatch: Dispatch): void {
        dispatch(detailFormActions.setResourceFilterValue(value))
    }
}
