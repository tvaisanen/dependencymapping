export * from './mapping/mapping.types';
export * from './asset/asset.types';
export * from './tag/tag.types';

type Action = {}

export type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
export type GetState = () => State;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;