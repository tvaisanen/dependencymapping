import requests
import json
from pprint import pprint

"""  Define api paths here"""

API_ROOT = "https://172.20.0.4/collab/?action=API&debug=True"
API_ASSETS = API_ROOT + '&resource=asset'
API_DEPENDENCIES = API_ROOT + '&resource=dependency'
API_MAPPINGS = API_ROOT + '&resource=mapping'
API_TAGS = API_ROOT + '&resource=tag'


def mapping_url_by_name(name):
    return "{path}&id{id}".format(path=API_MAPPINGS, id=name)


def dependency_url_by_name(name):
    return "{path}&id={id}".format(path=API_DEPENDENCIES, id=name)


def asset_url_by_name(name):
    return "{path}&id={id}".format(path=API_ASSETS, id=name)


def tag_url_by_name(name):
    return "{path}&id={id}".format(path=API_TAGS, id=name)


def asset(name, description, dependencies, tags):
    return {
        'name': name,
        'description': description,
        'dependencies': dependencies,
        'tags': tags
    }

####################################################################


def load_json(response):
    """
    Use this for parsing json content.
    All of the response contents should
    be json compatible.
    """
    try:
        data = json.loads(response.content)
        pprint(data)
        return data

    except Exception as ex:
        print(response.content)
        assert False


ASSET = "asset"
DEPENDENCY = "dependency"
MAPPING = "mapping"
TAG = "tag"

#  tvaisanen/gwiki-with-moin
#     user: collab
#     pw:  5OIC3LC0gF5S4wqkPHW1kqdmuw73AoSGOGZ8INHW0Bc=

user = 'collab'
password = '5OIC3LC0gF5S4wqkPHW1kqdmuw73AoSGOGZ8INHW0Bc='

credentials = (user, password)


def build_query_url(resource_type, resource_id):
    return "{root}?action=API&resource={type}&id={id}"\
        .format(root=API_ROOT, type=resource_type, id=resource_id)


def get_resource(resource_type, resource_id):
    url = build_query_url(resource_type, resource_id)
    return requests.get(url, verify=False, auth=credentials)


# test api root
def test_api_root_returns_200():
    r = requests.get(API_ROOT, verify=False, auth=credentials)
    data = load_json(r)
    keys = data.keys()

    # returns
    assert 200 == r.status_code

    # returns options
    assert TAG in keys
    assert DEPENDENCY in keys
    assert MAPPING in keys
    assert ASSET in keys


# test api assets
def test_api_assets_returns_200():
    r = requests.get(API_ASSETS, verify=False, auth=credentials)
    data = load_json(r)
    assert "TODO" not in str(data)
    assert 200 == r.status_code


def test_get_asset_that_dont_exist_returns_404():
    query_url = asset_url_by_name("DoNotExist")
    r = requests.get(query_url, verify=False, auth=credentials)
    data = load_json(r)
    assert 404 == r.status_code
    assert "error" in data.keys()
    assert "does not exist" in str(data)


def test_assets_create_returns_201():
    payload = asset("NewAsset", "Describe NewAsset here.", [], [])
    r = requests.post(API_ASSETS, verify=False, auth=credentials, data=payload)
    data = load_json(r)
    assert False


def test_assets_return_created_returns_200():
    query_url = asset_url_by_name("NewAsset")
    r = requests.post(query_url, verify=False, auth=credentials)
    data = load_json(r)
    assert "NewAsset" in str(data)
    assert False


"""
def test_asset_should_return_correctly():
    url = tag_url_by_name("TestTag")
    r = requests.get(url, verify=False, auth=credentials)
    data = load_json(r)
    print(data)
    assert data['name'] is "TestPageOne"
    assert data['description'] is "Describe TestPageOne here."
    assert len(data['dependencies']) is 0
    assert len(data['tags']) is 0

# test api dependencies
def test_api_dependencies_returns_200():
    r = requests.get(API_DEPENDENCIES, verify=False, auth=credentials)
    assert 200 == r.status_code


def test_dependency_todo_taken_care():
    r = requests.get(API_DEPENDENCIES, verify=False, auth=credentials)
    print(r.content)
    assert "TODO" in str(r.content)


# test api mappings
def test_api_mappings_returns_200():
    r = requests.get(API_MAPPINGS, verify=False, auth=credentials)
    assert 200 == r.status_code



# test api tags
def test_api_tags_returns_200():
    r = requests.get(API_TAGS, verify=False, auth=credentials)
    print(r.content)
    assert 200 == r.status_code


def test_tag_should_return():
    url = tag_url_by_name("TestTag")
    r = requests.get(url, verify=False, auth=credentials)
    print(r.content)
    data = json.loads(r.content)
    assert data['name'] is "TestTag"
    assert data['description'] is "Describe TestTag here."


def test_assets_root():
    r = requests.get("{root}&resource=asset".format(root=API_ROOT))
    assert False


def test_mappings_root():
    assert False


def test_tags_root():
    assert False


def test_get_testpageone():
    response = get_resource("asset", "TestPageOne")
    response_body = get_response_content(response)
    print('check here s')
    print(response_body)
    assert {"data": "TODO: Implement asset handler"} == json.loads(response.content)

def test_get_testpageone():
    response = get_resource("asset", "TestPageTwo")
    response_body = get_response_content(response)
    print('check here if check if testpagetwo has link')
    print(response_body)
    assert {"data": "TODO: Implement asset handler"} == json.loads(response.content)
"""
