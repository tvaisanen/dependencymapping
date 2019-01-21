
export const SET = 'SET_EVENT_HOOK';
export const CLEAR = 'CLEAR_EVENT_HOOK';

const emptyHook = {hook:"", callback: null };

export default function (state=emptyHook, action) {
    switch(action.type){
        case SET:
            return action.hook

        case CLEAR:
            return emptyHook;

        default:
            return state;
    }
}