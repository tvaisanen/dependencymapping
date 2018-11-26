from conftest import *

# paths = Paths(debug=True)

# test api assets
def test_get_tags_returns_list_of_the_existing_tags():
    """
    Test that all off the assets are returned
    if the root is called.
    Behaviour:
    ~ ListView
    """

    expect = ['TestPage', 'TestTag', 'OtherTag']

    query_url = paths.get_resource_path(TAG, "")

    r = requests.get(query_url, verify=False, auth=credentials)

    data = r.json()  # array of tag names

    receivedTags = [
        {
            NAME: item[NAME],
            DESCRIPTION: item[DESCRIPTION]
        } for item in data
    ]

    pprint(data)

    assert 200 == r.status_code
    assert receivedTags == tags

def test_get_asset_by_name_returns():
    """
    Test that the data can be retrieved
    Behaviour:
    ~ DetailView

    :return: Page as asset JSON object

    tags[0] = {
        'name': 'TestPage',
        'description': 'Describe Tag/GwCategory TestPage here.',
    }

    """

    tag = tags[0]
    query_url = paths.get_resource_path(TAG, tag[NAME])
    r = requests.get(query_url, verify=False, auth=credentials)
    data = load_json(r)

    assert data[NAME] == tag[NAME]
    assert data[DESCRIPTION] == tag[DESCRIPTION]


def test_get_asset_that_dont_exist_returns_404():
    """
    Test that when trying to retrieve a detail of
    a page, a not found: 404 status is returned
    with an error message stating that it does not
    exist.
    """
    query_url = paths.get_resource_path(TAG, "DoNotExist")
    r = requests.get(query_url, verify=False, auth=credentials)
    data = load_json(r)

    assert 404 == r.status_code
    assert RESOURCE_DOES_NOT_EXIST in str(r.content)


def test_post_tag_create_returns_201():
    """
    Test that put asset will create a page
    that can be read as an asset.
    :return: The payload echoed after creation
    with created: 201
    """
    tag_name = "NewTag"
    tag_desc = "Describe gwikicategory / tag NewTag here."

    new_tag = {
        NAME: tag_name,
        DESCRIPTION: tag_desc
    }

    query_url = paths.get_page_path(new_tag[NAME])
    r = requests.get(query_url, verify=False, auth=credentials)

    assert PAGE_DOES_NOT_EXIST in str(r.content)

    # data to create the new page.
    payload = tag(tag_name, tag_desc)
    query_url = paths.get_resource_path(TAG, "")
    r = requests.post(query_url, verify=False, auth=credentials, json=payload)
    data = load_json(r)


    query_url = paths.get_page_path(new_tag[NAME], updated=True)

    """ assert that the tag is created and can be accessed """
    r = requests.get(query_url, verify=False, auth=credentials)

    """ If the page has not been created yet, there will be 
        a text on the wiki page saying 'Create new empty page'.
        Therefore after successful creation this shouldn't be
        visible on the new page. -> 'assert dont_expect not in r.text'
    """


    assert data[NAME] == new_tag[NAME]
    assert data[DESCRIPTION] == new_tag[DESCRIPTION]
    assert PAGE_DOES_NOT_EXIST not in str(r.content)




def test_put_asset_makes_updates_and_returns_200():
    """
    Test that the put method updates the
    content of a page

    """

    tag_to_edit = tags[1]

    query_url = paths.get_resource_path(TAG, tag_to_edit[NAME])

    """ Get the data first """
    r = requests.get(query_url, verify=False, auth=credentials)
    data = load_json(r)

    assert data[DESCRIPTION] == tag_to_edit[DESCRIPTION]

    """ Then get the page version """

    query_url = paths.get_page_path(tag_to_edit[NAME])
    r = requests.get(query_url, verify=False, auth=credentials)

    assert data[DESCRIPTION] in r.text

    updated_data = {
        NAME: tag_to_edit[NAME],
        DESCRIPTION: UPDATED_TAG_DESCRIPTION,
    }

    query_url = paths.get_resource_path(TAG, tag_to_edit[NAME])

    r = requests.put(query_url, verify=False, auth=credentials, json=updated_data)

    assert r.status_code == 200


    """ After the put the page should show the edited text
        and the edited data should have been returned by the
        put request.
    """

    query_url = paths.get_page_path(tag_to_edit[NAME], updated=True)
    r = requests.get(query_url, verify=False, auth=credentials,)

    assert updated_data[DESCRIPTION] in str(r.content)

    query_url = paths.get_resource_path(TAG, tag_to_edit[NAME])
    r = requests.get(query_url, verify=False, auth=credentials)

    retrieved_updated_data = r.json()

    # verify that the updated asset returns same asset
    assert updated_data[NAME] == retrieved_updated_data[NAME]
    assert UPDATED_TAG_DESCRIPTION == retrieved_updated_data[DESCRIPTION]


    # finally check that the description before update is not haunting
    assert updated_data[DESCRIPTION] is not retrieved_updated_data[DESCRIPTION]
