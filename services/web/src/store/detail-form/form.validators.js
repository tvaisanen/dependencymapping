import { ASSET, CONNECTION, MAPPING, TAG } from "../../constants";

function logTodo(message){

    console.info(
        `%cTODO: %c${message}`,
        "color:orange;font-size:24px",
        "color:black;font-size:24px",
        );
}

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
    logTodo("Validate Mapping Form!");
     return {
        formIsValid: true,
        fieldErrors: false
    }
}

function validateTagForm (form){
    logTodo("Validate Tag Form!");
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