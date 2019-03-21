import {deleteTagSuccess, loadTagsSuccess, postTagSuccess, updateTagSuccess} from "../tag.actions";
import {DELETE_TAG_SUCCESS, LOAD_TAGS_SUCCESS, POST_TAG_SUCCESS, UPDATE_TAG_SUCCESS} from "../tag.action-types";

test('postTagSuccess should return: {type: POST_TAG_SUCCESS, tag}', () => {
    const tag = {
        name: "namefield",
        description: "Description"
    };
    const action = postTagSuccess(tag)

    expect(action.type).toEqual(POST_TAG_SUCCESS);
    expect(action.tag).toEqual(tag);
});

test('updateTagSuccess should return: {type: UPDATE_TAG_SUCCESS, tag}', () => {
    const tag = {
        name: "namefield",
        description: "Description"
    };
    const action = updateTagSuccess(tag)

    expect(action.type).toEqual(UPDATE_TAG_SUCCESS);
    expect(action.tag).toEqual(tag);
});

test('deleteTagSuccess should return: {type: DELETE_TAG_SUCCESS, (tagName: string)}', () => {
    const tagName = "name for tag";
    const action = deleteTagSuccess(tagName);
    expect(action.type).toEqual(DELETE_TAG_SUCCESS);
    expect(action.tagName).toEqual(tagName);
});

test('loadTagsSuccess should return: {type: LOAD_TAGS_SUCCESS, (tags: Array<Tag>)}', () => {
    const tags = [
        {name: "nameone", description: "description one"},
        {name: "nametwo", description: "description two"}
    ];

    const action = loadTagsSuccess(tags);
    expect(action.type).toEqual(LOAD_TAGS_SUCCESS);
    expect(action.tags).toEqual(tags);
});
