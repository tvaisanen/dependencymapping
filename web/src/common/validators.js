import _ from 'lodash';

export function validMappingName (name){
    /**
     * Mapping name should be at least 3 characters.
     * */

    if (_.isString(name)) { // name is string

        // name is at least 3 characters long
        if (name.length >= 3){
           return true;
        }

    }

    return false;
}

export function validDescription (description){
    if (_.isString(description)){
        if (description.length >= 15){
            return true;
        }
    }

    return false;
}
