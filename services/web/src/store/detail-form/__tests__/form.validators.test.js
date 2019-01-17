import formValidators from '../form.validators';
import { CONNECTION } from "../../../constants";

const connectionFormValidator =  formValidators[CONNECTION];

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

    console.log({formIsValid, fieldErrors});

    expect(formIsValid).toEqual(false);
});
