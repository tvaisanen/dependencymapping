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
    alert('todo validate asset form')
}

function validateMappingForm (form){
    alert('todo mapping asset form')
}

function validateTagForm (form){
    alert('todo tag asset form')
}

export default {
    ASSET: validateAssetForm,
    CONNECTION: validateConnectionForm,
    MAPPING: validateMappingForm,
    TAG: validateTagForm
}