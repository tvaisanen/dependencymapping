from conftest import *


def test_get_mappings_without_id_returns_mapping_name_list_with_status_200():
    """
    Test that the root returns
    Behaviour:

    ~ ListView
    """

    query_url = paths.get_resource_path(MAPPING, "")

    r = requests.get(query_url, verify=False, auth=credentials)
    data = load_json(r)

    response_mappings = [
        mapping(
            item[NAME],
            item[DESCRIPTION],
            item[ASSETS],
            item[TAGS]
        )
        for item in data
    ]

    print("\ndebug:\n")
    print(query_url)
    pprint(response_mappings)

    for item in response_mappings:
        assert item in mappings


def test_get_not_existing_mapping_returns_404():

    query_url = paths.get_resource_path(MAPPING, "MappingDoNotExist")
    r = requests.get(query_url, verify=False, auth=credentials)

    assert r.status_code == 404


def test_get_mapping_by_id_returns_correctly_with_200():

    expect = mappings[0]

    query_url = paths.get_resource_path(MAPPING, "TestMappingOne")
    r = requests.get(query_url, verify=False, auth=credentials)

    data = load_json(r)

    assert data[NAME] == expect[NAME]
    assert data[DESCRIPTION] == expect[DESCRIPTION]
    assert data[ASSETS] == expect[ASSETS]
    assert data[TAGS] == expect[TAGS]


def test_mapping_page_has_links_to_assets_and_tags():

    mapping = mappings[0]

    asset_and_tag_names = mapping[ASSETS] + mapping[TAGS]

    query_url = paths.get_page_path(mapping[NAME])
    r = requests.get(query_url, verify=False, auth=credentials)

    find_these_links = [
        bytes('{link}">{link}</a>'.format(
                path=WIKI_ROOT,
                link=link
            ),
            encoding=r.encoding
        )
        for link in asset_and_tag_names
    ]

    print("\ndebug:\n")
    print(query_url)
    [print(link) for link in find_these_links]

    for link in find_these_links:
        assert link in r.content


def test_put_mapping_updates_data_and_returns_200_with_success_msg():

    mapping_to_update = mappings[0]

    NEW_ASSET = "NewAsset"
    NEW_TAG = "NewTag"

    update_to = mapping(
        mapping_to_update[NAME],
        mapping_to_update[DESCRIPTION],
        mapping_to_update[ASSETS] + [NEW_ASSET],
        mapping_to_update[TAGS] + [NEW_TAG]
    )

    """ Get the page and check that the
        intended changes are not included
        already
    """

    query_url = paths.get_page_path(mapping_to_update[NAME])

    r = requests.get(query_url, verify=False, auth=credentials)

    assert bytes(NEW_ASSET, encoding=r.encoding) not in r.content
    assert bytes(NEW_TAG, encoding=r.encoding) not in r.content

    """ make the put request with the payload"""

    query_url = paths.get_resource_path(MAPPING, mapping_to_update[NAME])

    r = requests.put(query_url, verify=False, auth=credentials, data=update_to)

    print("debug:")
    print(query_url)
    print(r.json())

    assert r.status_code == 200
    assert "Resource updated succesfully." == r.json()['msg']

    """ Verify that the data changes are reflected
        to the database
    """

    query_url = paths.get_resource_path(MAPPING, mapping_to_update[NAME])
    r = requests.get(query_url, verify=False, auth=credentials)

    retrieved_data = r.json()

    assert retrieved_data[NAME]         == update_to[NAME]
    assert retrieved_data[DESCRIPTION]  == update_to[DESCRIPTION]
    assert retrieved_data[ASSETS]       == update_to[ASSETS]
    assert retrieved_data[TAGS]         == update_to[TAGS]

    """ Now get the page after update and 
        check that the new links are added
    """
    query_url = paths.get_page_path(mapping_to_update[NAME], updated=True)
    r = requests.get(query_url, verify=False, auth=credentials)

    assert bytes(NEW_ASSET, encoding=r.encoding) in r.content
    assert bytes(NEW_TAG, encoding=r.encoding) in r.content



def test_post_mapping_creates_mapping_with_a_page_and_returns_201():
    assert False


def test_post_conflict_returns_pointer_to_existing_with_status_409():
    assert False


def test_delete_mapping_deletes_mapping_and_returns_204():
    assert False

