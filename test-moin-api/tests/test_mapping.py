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

