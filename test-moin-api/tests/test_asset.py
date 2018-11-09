from conftest import *


# test api assets
def test_get_assets_returns_200():
    """
    Test that all off the assets are returned
    if the root is called.
    Behaviour:
    ~ ListView
    """
    r = requests.get(API_ASSETS, verify=False, auth=credentials)
    data = load_json(r)
    assert "TODO" not in str(data)
    assert 200 == r.status_code


def test_that_assets_have_the_connected_to_assets_as_links():
    """
    Test that the test data assets have the links in
    the created wiki pages
    :return:

    pages[2] ==  {
        'name': 'TestPageThree',
        'description': "Describe TestPageOne here.",
        'connected_to': ['TestPageOne', 'TestPageThree'],
        'tags': ['TestPage', 'TestTag']
    }

    for debugging un comment the prints and they'll be printed
    on assert failure

    @author Toni Väisänen
    @date   9.11.2018

    Tested by manually creating the page in Graphingwiki

    """
    page = pages[2]

    query_url = WIKI_ROOT + page['name']  # page['name']
    r = requests.get(query_url, verify=False, auth=credentials)
    find_these_links = [
        bytes('<a href="{path}{link}">{link}</a>'.format(
                path=WIKI_PATH,
                link=link
            ),
            encoding=r.encoding
        )
        for link in page['connected_to']
    ]

    """ print to see whats happening """
    # print("These links should be found from the page content:\n")
    # [print("\t* {}".format(link)) for link in find_these_links]

    # print("\nquery_url: {}\n".format(query_url))
    # print("content:\n{}\n".format(r.content))

    for link in find_these_links:
        assert link in r.content


def test_that_assets_have_the_tags_as_gwikicategory_links():
    """
    Test that the test data assets have the links in
    the created wiki pages
    :return:

    pages[2] ==  {
        'name': 'TestPageThree',
        'description': "Describe TestPageOne here.",
        'connected_to': ['TestPageOne', 'TestPageThree'],
        'tags': ['TestPage', 'TestTag']
    }

    for debugging un comment the prints and they'll be printed
    on assert failure

    @author Toni Väisänen
    @date   9.11.2018

    Tested by manually creating the page in Graphingwiki

    """
    page = pages[2]

    query_url = WIKI_ROOT + page['name']  # page['name']
    r = requests.get(query_url, verify=False, auth=credentials)
    find_these_links = [
        bytes('<a href="{path}{link}">{link}</a>'.format(
                path=WIKI_PATH,
                link=link
            ),
            encoding=r.encoding
        )
        for link in page['connected_to']
    ]

    """ print to see whats happening """
    # print("These links should be found from the page content:\n")
    # [print("\t* {}".format(link)) for link in find_these_links]

    # print("\nquery_url: {}\n".format(query_url))
    # print("content:\n{}\n".format(r.content))

    for link in find_these_links:
        assert link in r.content


def test_get_asset_by_id_returns():
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
    url = asset_url_by_name(expected['name'])
    r = requests.get(url, verify=False, auth=credentials)
    data = load_json(r)
    print(data)
    assert data is expected


def test_get_asset_that_dont_exist_returns_404():
    """
    Test that when trying to retrieve a detail of
    a page, a not found: 404 status is returned
    with an error message stating that it does not
    exist.
    """
    query_url = asset_url_by_name("DoNotExist")
    r = requests.get(query_url, verify=False, auth=credentials)
    data = load_json(r)
    assert 404 == r.status_code
    assert "error" in data.keys()
    assert "does not exist" in str(data)


def test_post_asset_create_returns_201():
    """
    Test that put asset will create a page
    that can be read as an asset.
    :return: The payload echoed after creation
    with created: 201
    """
    asset_name = "NewAsset"
    asset_desc = "Description for NewAsset here."
    payload = asset(asset_name, asset_desc, [], [])
    r = requests.post(API_ASSETS, verify=False, auth=credentials, data=payload)
    data = load_json(r)

    """ assert here that the data returns as it should """
    # assert False

    """ assert that the page is created and can be accessed """
    r = requests.get(WIKI_ROOT + asset_name, verify=False, auth=credentials)
    print(r.content)
    dont_expect = "Create new empty page"
    assert data['name'] is asset_name
    assert data['description'] is asset_desc
    assert dont_expect not in r.text


def test_put_asset_makes_the_changes():
    """
    Test that the put method updates the
    content of a page
    :return:

    pages[1] == {
        'name': 'TestPageTwo',
        'description': "Describe TestPageOne here.",
        'connected_to': ['TestPageThree'],
        'tags': ['TestPage']
    },

    """
    asset_to_edit = pages[1]
    query_url = asset_url_by_name(asset_to_edit['name'])

    """ Get the data first """
    r = requests.get(query_url, verify=False, auth=credentials)
    data = load_json(r)

    assert data['description'] is asset_to_edit['description']

    """ Then get the page version """
    r = requests.get(WIKI_ROOT + asset_to_edit['name'], verify=False, auth=credentials)

    assert data['description'] in r.text

    updated_data = {
        'name': asset_to_edit['name'],
        'description': "This should be seen as description after update.",
        'connected_to': asset_to_edit['connected_to'],
        'tags': asset_to_edit['tags']
    }

    r = requests.put(query_url, verify=False, auth=credentials, data=updated_data)

    put_response_data = load_json(r)

    assert put_response_data['name'] is asset_to_edit['name']
    assert put_response_data['description'] is not asset_to_edit['description']
    assert put_response_data['description'] is updated_data['description']


