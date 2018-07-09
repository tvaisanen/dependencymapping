import {
    validMappingName,
    validDescription
} from "../validators";

test('valdMappingName() should return false if argument less than 3 chars', () => {
    const result = validMappingName("aa");
    expect(result).toEqual(false);
});

test('validMappingName() should return false if argument not string', ()=>{
    const result = validMappingName({});
    expect(result).toEqual(false);
});

test('validMappingName() should return true if argument is string and at least 3 chars', () => {
    const result = validMappingName("hello");
    expect(result).toEqual(true);
});

test('validDescription should return false if description not string', () => {
    const result = validDescription(["I'm a description inside an array", "continue"]);
    expect(result).toEqual(false);
})

test('validDescription return false if description less than 15 chars', () => {
    const result = validDescription("less than 15");
    expect(result).toEqual(false);
})