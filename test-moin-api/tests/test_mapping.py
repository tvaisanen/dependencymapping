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
