from conftest import *


# test api assets
def test_get_assets_returns_all_created_assets():
    """
    Test that the root returns list of pages
    as assets. These are used for the rest of
    the tests.
    Behaviour:
    ~ ListView
    """
    query_url = paths.get_resource_path(ASSET, "")

    r = requests.get(query_url, verify=False, auth=credentials)
    data = r.json()

    response_assets = [
        asset(
            item[NAME],
            item[DESCRIPTION],
            item[CONNECTED_TO],
            item[TAGS]
        )
        for item in data
    ]

    for item in response_assets:
        assert item in pages


def test_that_assets_have_the_connected_to_assets_as_links():
    """
    Test that the test data assets have the links for the
    Categories..

    Note:
        Graphingwiki does not use any tagging indicating
        which links are Graphingwiki Categories. This
        could be a potential target for improving the GW.

    pages[3] == {
        'name': 'TestPageFour',
        'description': "Describe TestPageOne here.",
        'connected_to': [],
        'tags': ['TestPage', 'TestTag']
    }

    for debugging un comment the prints and they'll be printed
    on assert failure

    @author Toni Väisänen
    @date   9.11.2018

    Tested by manually creating the gwcategory links in Graphingwiki

    """

    page = pages[3]
    query_url = paths.get_page_path(page['name'])

    r = requests.get(query_url, verify=False, auth=credentials)

    find_these_links = [
        bytes('{link}">{link}</a>'.format(
                path=WIKI_ROOT,
                link=link
            ),
            encoding=r.encoding
        )
        for link in page['connected_to']
    ]

    """ Print to see whats happening for debugging purposes. """
    """
    print("These links should be found from the page content:\n")
    [print("\t* {}".format(link)) for link in find_these_links]
    print("\nquery_url: {}\n".format(query_url))
    print("content:\n{}\n".format(r.content))
    
    """
    for link in find_these_links:
        assert link in r.content


def test_that_assets_have_the_tags_as_gwikicategory_links():
    """
    Test that the test data assets have the links in
    the created wiki pages
    :return:

    pages[3] =={
        'name': 'TestPageFour',
        'description': "Describe TestPageOne here.",
        'connected_to': [],
        'tags': ['TestPage', 'TestTag']
    }

    for debugging un comment the prints and they'll be printed
    on assert failure

    @author Toni Väisänen
    @date   9.11.2018

    Tested by manually creating the page in Graphingwiki

    """
    page = pages[3]

    query_url = paths.get_page_path(page[NAME])
    r = requests.get(query_url, verify=False, auth=credentials)

    """ 
        These links could be any links since there's no
        separation between GW category links and "normal
        page links.
    """

    find_these_links_to_tags = [
        bytes('{link}">{link}</a>'.format(
                path=WIKI_ROOT,
                link=link
            ),
            encoding=r.encoding
        )
        for link in page['tags']
    ]

    """ these are printed out if assert failure """

    print("These links should be found from the page content:\n")
    [
        print("\t* {}".format(link))
        for link in find_these_links_to_tags
    ]
    print("\nquery_url: {}\n".format(query_url))
    print("content:\n{}\n".format(r.content))

    """ ####################################### """

    for link in find_these_links_to_tags:
        assert link in r.content


def test_get_asset_by_name_returns():
    """
    Test that the data can be retrieved
    Behaviour:
    ~ DetailView
    :return: Page as asset JSON object

    pages[0] == {
        'name': 'TestPageOne',
        'description': "Describe TestPageOne here.",
        'connected_to': ['TestPageFour'],
        'tags': ['TestPage']
    }
    """
    expected = pages[0]
    url = paths.get_resource_path(ASSET, expected[NAME])
    r = requests.get(url, verify=False, auth=credentials)
    data = load_json(r)

    assert data[NAME] == expected[NAME]
    assert data[DESCRIPTION] == expected[DESCRIPTION]
    assert data[CONNECTED_TO] == expected[CONNECTED_TO]
    assert data[TAGS] == expected[TAGS]


def test_get_asset_that_dont_exist_returns_404():
    """
    Test that when trying to retrieve a detail of
    a page, a not found: 404 status is returned
    with an error message stating that it does not
    exist.
    """
    query_url = paths.get_resource_path(ASSET, "DoNotExist")
    r = requests.get(query_url, verify=False, auth=credentials)
    data = load_json(r)
    assert 404 == r.status_code
    assert response_messages[GET]['404'] in str(data)


def test_post_asset_create_returns_201():
    """
    Test that put asset will create a page
    that can be read as an asset.
    :return: The payload echoed after creation
    with created: 201
    """
    asset_name = "NewAsset"
    asset_desc = "Describe NewAsset here."
    asset_connected_to = ["TestPageOne", "TestPageTwo"]
    asset_tags = ["TestTag"]

    # expect before creating a page and not after
    expect_before = PAGE_DOES_NOT_EXIST

    # Expect to find "create new empty page" since the page
    # is not created yet
    query_url = paths.get_page_path(asset_name)
    r = requests.get(query_url, verify=False, auth=credentials)

    assert expect_before in str(r.content)

    """ After creating the page check that everything is Ok. """

    # data to create the new page.
    payload = asset(asset_name, asset_desc, asset_connected_to, asset_tags)
    query_url = paths.get_resource_path(ASSET, "")
    r = requests.post(query_url, verify=False, auth=credentials, data=payload)
    data = load_json(r)

    """ assert that the page is created and can be accessed """
    query_url = paths.get_page_path(asset_name, updated=True)
    r = requests.get(query_url, verify=False, auth=credentials)

    links = asset_connected_to + asset_tags

    expect_to_find_from_response = [
        bytes('{link}">{link}</a>'.format(
                path=WIKI_ROOT,
                link=link
            ),
            encoding=r.encoding
        )
        for link in links
    ]

    for link in expect_to_find_from_response:
        assert link in r.content

    assert expect_before not in r.text
    assert data[NAME] == payload[NAME]
    assert data[DESCRIPTION] == payload[DESCRIPTION]
    assert data[CONNECTED_TO] == payload[CONNECTED_TO]
    assert data[TAGS] == payload[TAGS]


def test_put_asset_makes_the_changes():
    """
    Test that the put method updates the
    content of a page

    pages[1] == {
        'name': 'TestPageTwo',
        'description': "Describe TestPageOne here.",
        'connected_to': ['TestPageThree'],
        'tags': ['TestPage']
    }
    """

    asset_to_edit = pages[1]

    query_url = paths.get_resource_path(ASSET, asset_to_edit[NAME])

    """ Get the data first """
    r = requests.get(query_url, verify=False, auth=credentials)
    data = load_json(r)

    assert data[DESCRIPTION] == asset_to_edit[DESCRIPTION]

    updated_data = {
        NAME: asset_to_edit[NAME],
        DESCRIPTION: "This should be seen as a description after the update.",
        CONNECTED_TO: asset_to_edit[CONNECTED_TO],
        TAGS: asset_to_edit[TAGS]
    }

    r = requests.put(query_url, verify=False, auth=credentials, data=updated_data)

    assert r.status_code == 204

    """ After the put the page should show the edited text
        and the edited data should have been returned by the
        put request.
    """

    r = requests.get(query_url, verify=False, auth=credentials, data=updated_data)

    received_data = r.json()

    # verify that the updated asset returns same asset
    assert updated_data[NAME] == asset_to_edit[NAME]

    # verify that the updated description can be found
    # from the rendered html page
    # assert bytes(updated_data['description'], r.encoding) in r.content

    # verify that the received data matches sent data.
    assert received_data[DESCRIPTION] == updated_data[DESCRIPTION]


