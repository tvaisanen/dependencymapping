import { ASSET, CONNECTION, MAPPING, TAG } from "../../constants";

function logTodo(message){

    console.info(
        `%cTODO: %c${message}`,
        "color:orange;font-size:24px",
        "color:black;font-size:24px",
        );
}

const NAME_FIELD_ERROR = "Name is a required field";

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

    const name = form.name === "" ? NAME_FIELD_ERROR : false;

    return {
        formIsValid: !name,
        fieldErrors: {name}
    }
}

function validateMappingForm (form){

    const name = form.name === "" ? NAME_FIELD_ERROR : false;

    // form is valid if no errors
    const formIsValid = !name;

    return {
        formIsValid,
        fieldErrors: {name}
    }
}

function validateTagForm (form){

    const name = form.name === "" ? NAME_FIELD_ERROR : false;

    // form is valid if no errors
    const formIsValid = !name;

    return {
        formIsValid,
        fieldErrors: {name}
    }
}

export default {
    [ASSET]: validateAssetForm,
    [CONNECTION]: validateConnectionForm,
    [MAPPING]: validateMappingForm,
    [TAG]: validateTagForm
}