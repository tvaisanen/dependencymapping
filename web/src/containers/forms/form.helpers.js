import _ from 'lodash';


export const getSelected = options => {
    let selected = [];
     for  ( let i = 0; i < options.length; i++){
            let option = options[i];
            if (option.selected){
                selected.push(option.value);
            }
        }
    return selected;
}      

export const selectOptionsInList = ({list, options}) => {
    for (let i = 0; i < options.length; i++){
        if ( _.find(list, (listItem) => options[i].value === listItem)){
            options[i].selected = true;
        } else {
            options[i].selected = false;
        }
    }
}