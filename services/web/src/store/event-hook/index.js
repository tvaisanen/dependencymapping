import {SET, CLEAR} from './event-hook.reducer';

export {default} from './event-hook.reducer';


type Hook = {
    hook: string,
    callback: (any) => void
}

export function setEventHook(hook: Hook){
    return {type: SET, hook}
}

export function clearEventHook(){
    return {type: CLEAR}
}