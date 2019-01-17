import formValidators from '../form.validators';
import { ASSET, CONNECTION } from "../../../constants";

const connectionFormValidator =  formValidators[CONNECTION];
const assetFormValidator =  formValidators[ASSET];

test('Connection form validator should return false if no source and target assets provided', () => {

    const invalidForm = {
        source: "",
        target: "",
    };

    const { formIsValid, fieldErrors } = connectionFormValidator(invalidForm);

    expect(formIsValid).toEqual(false);
});


test('Connection form validator should return false if no target assets provided', () => {

    const invalidForm = {
        source: "source asset",
        target: "",
    };

    const { formIsValid, fieldErrors } = connectionFormValidator(invalidForm);
    expect(formIsValid).toEqual(false);
});

test('Connection form validator should return true if target and source provided', () => {

    const invalidForm = {
        source: "source asset",
        target: "target asset",
    };

    const { formIsValid, fieldErrors } = connectionFormValidator(invalidForm);
    expect(formIsValid).toEqual(true);
});


test('Asset validator should return false if no name provided', () => {
    const invalidForm = {
        name: "",
    };

    const { formIsValid, fieldErrors } = assetFormValidator(invalidForm);

    expect(formIsValid).toEqual(false);
});


test('Asset validator should return true if name provided', () => {

    const invalidForm = {
        name: "name provided",
    };

    const { formIsValid, fieldErrors } = assetFormValidator(invalidForm);

    expect(formIsValid).toEqual(true);
});
