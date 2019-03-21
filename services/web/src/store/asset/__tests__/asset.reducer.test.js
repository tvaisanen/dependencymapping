import assetReducer from '../asset.reducer';

test(' should be removed from the store after success the tag with name t.name', () => {

    const [tagToPersist, tagToRemove] = initialState;

    const state = tagReducer(
        initialState,
        actions.deleteTagSuccess(tagToRemove.name)
    );

    const expected = [tagToPersist];
    expect(state).toEqual(expected)
});