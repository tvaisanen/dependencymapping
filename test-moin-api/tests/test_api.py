"""from . import *

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

"""
