
export const SET = 'SET_EVENT_HOOK';
export const CLEAR = 'CLEAR_EVENT_HOOK';

export const clearEventHook = () => ({type: CLEAR});

const emptyHook = {hook:"", callback: null, notification: "", optionalAction: null };

export default function (state=emptyHook, action) {
    switch(action.type){
        case SET:
            return action.hook;

        case CLEAR:
            return emptyHook;

        default:
            return state;
    }
}