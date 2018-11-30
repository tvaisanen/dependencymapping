import type {AssetState} from "./asset/asset.types";
import type {MappingAction, MappingState} from "./mapping/mapping.types";
import type {TagState} from "./tag/tag.types";
import type {ActiveDetailState} from './active-detail/active-detail.types';
import type {ActiveMappingState} from "./active-mapping/active-mapping.types";

export * from './mapping/mapping.types';
export * from './asset/asset.types';
export * from './tag/tag.types';

export const emptyArray: Array<any> = [];

type Action = {}

export type State = {
    app: any,
    auth: any,
    mappings: MappingState,
    assets: AssetState,
    tags: TagState,
    activeMapping: ActiveMappingState,
    activeDetail: ActiveDetailState,
    graph: any
}

// todo: add all the action types
type Action = MappingAction | any;


export type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
export type GetState = () => State;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;