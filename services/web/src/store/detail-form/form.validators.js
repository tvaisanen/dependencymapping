import { ASSET, CONNECTION, MAPPING, TAG } from "../../constants";

function validateConnectionForm(form) {

    const source = form.source === "" ? "source asset is required" : false;
    const target = form.target === "" ? "target asset is required" : false;

    // form is valid if no errors
    const formIsValid = !(source || target);

    return {
        formIsValid,
        fieldErrors: {
            source,
            target
        }
    }
}

function validateAssetForm (form){

    const name = form.name === "" ? "asset name is required" : false;

    return {
        formIsValid: !name,
        fieldErrors: {name}
    }
}

function validateMappingForm (form){
    alert('todo mapping asset form')
     return {
        formIsValid: true,
        fieldErrors: false
    }
}

function validateTagForm (form){
    alert('todo tag asset form')
    return {
        formIsValid: true,
        fieldErrors: false
    }
}

export default {
    ASSET: validateAssetForm,
    CONNECTION: validateConnectionForm,
    MAPPING: validateMappingForm,
    TAG: validateTagForm
}