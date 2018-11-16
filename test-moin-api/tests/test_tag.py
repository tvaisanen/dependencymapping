from conftest import *


# test api assets
def test_get_tags_returns_200():
    """
    Test that the root returns
    Behaviour:
    ~ ListView
    """
    r = requests.get(API_TAGS, verify=False, auth=credentials)
    data = load_json(r)
    assert "TODO" not in str(data)
    assert 200 == r.status_code


# test api assets
def test_get_tags_returns_list_of_the_tag_pagenames():
    """
    Test that all off the assets are returned
    if the root is called.
    Behaviour:
    ~ ListView
    """
    expect = ['TestPage', 'TestTag', 'OtherTag']

    r = requests.get(API_ASSETS, verify=False, auth=credentials)
    data = load_json(r)
    assert 200 == r.status_code
    assert expect is data


def test_get_asset_by_id_returns():
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
    query_url = tag_url_by_name(tag['name'])
    r = requests.get(query_url, verify=False, auth=credentials)
    data = load_json(r)

    assert data is tag


def test_get_asset_that_dont_exist_returns_404():
    """
    Test that when trying to retrieve a detail of
    a page, a not found: 404 status is returned
    with an error message stating that it does not
    exist.
    """
    query_url = tag_url_by_name("DoNotExist")
    r = requests.get(query_url, verify=False, auth=credentials)
    data = load_json(r)
    assert 404 == r.status_code
    assert "error" in data.keys()
    assert "does not exist" in str(data)


def test_post_tag_create_returns_201():
    """
    Test that put asset will create a page
    that can be read as an asset.
    :return: The payload echoed after creation
    with created: 201
    """
    tag_name = "NewTag"
    tag_desc = "Description for NewAsset here."

    # data to create the new page.
    payload = tag(tag_name, tag_desc)
    r = requests.post(API_ASSETS, verify=False, auth=credentials, data=payload)
    data = load_json(r)

    query_url = tag_url_by_name(tag_name)

    """ assert that the tag is created and can be accessed """
    r = requests.get(API_TAGS, verify=False, auth=credentials)

    """ If the page has not been created yet, there will be 
        a text on the wiki page saying 'Create new empty page'.
        
        Therefore after successful creation this shouldn't be
        visible on the new page. -> 'assert dont_expect not in r.text'
        
    """

    dont_expect = "Create new empty page"

    assert data['name'] is tag_name
    assert data['description'] is tag_desc
    assert dont_expect not in r.text


def test_put_tag_makes_the_changes_and_returns_204():
    """
    Test that the put method updates the
    content of a page
    tags[1] = {
        'name': 'TestTag',
        'description': 'Describe Tag/GwCategory TestTag here.',
    },

    """

    tag_to_edit = tags[1]
    query_url = tag_url_by_name(tag_to_edit['name'])

    """ Get the data first """
    r = requests.get(query_url, verify=False, auth=credentials)

    data = load_json(r)

    assert data['description'] is tag_to_edit['description']

    """ Then get the page version """
    r = requests.get(WIKI_ROOT + tag_to_edit['name'], verify=False, auth=credentials)

    # assert data['description'] in r.text

    updated_data = {
        'name': tag_to_edit['name'],
        'description': "This should be seen as a description after the update.",
    }

    r = requests.put(query_url, verify=False, auth=credentials, data=updated_data)

    put_response_data = load_json(r)

    """ After the put the page should show the edited text
        and the edited data should have been returned by the
        put request.
    """

    r = requests.get(
        WIKI_ROOT + tag_to_edit['name'],
        verify=False, auth=credentials
    )

    # verify that the updated asset returns same asset
    assert put_response_data['name'] is tag_to_edit['name']

    # verify that the updated description can be found
    # from the rendered html page
    assert bytes(updated_data['description'], r.encoding) in r.content

    # verify that the received data matches sent data.
    assert put_response_data['description'] is updated_data['description']

