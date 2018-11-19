from pprint import pprint
import requests
import json
import urllib3

pages = [
    {
        'name': 'TestPageOne',
        'description': "Describe TestPageOne here.",
        'connected_to': ['TestPageFour'],
        'tags': ['TestPage']
    },
    {
        'name': 'TestPageTwo',
        'description': "Describe TestPageTwo here.",
        'connected_to': ['TestPageThree'],
        'tags': ['TestPage']
    },
    {
        'name': 'TestPageThree',
        'description': "Describe TestPageThree here.",
        'connected_to': ['TestPageOne', 'TestPageFour'],
        'tags': ['TestPage', 'TestTag']
    },
    {
        'name': 'TestPageFour',
        'description': "Describe TestPageFour here.",
        'connected_to': [],
        'tags': ['TestPage', 'TestTag']
    }
]

tags = [
    {
        'name': 'TestPage',
        'description': 'Describe Tag/GwCategory TestPage here.',
    },
    {
        'name': 'TestTag',
        'description': 'Describe Tag/GwCategory TestTag here.',
    },
    {
        'name': 'OtherTag',
        'description': 'Describe Tag/GwCategory OtherTag here.',
    },
]

mappings = [
    {
        'name': 'TestMappingOne',
        'description': "Describe TestMappingOne here.",
        'assets': ['TestPageOne', 'TestPageTwo', 'TestPageThree'],
        'tags': ['TestPage', 'TestTag']
    },
    {
        'name': 'TestMappingTwo',
        'description': "Describe TestMappingTwo here.",
        'assets': [],
        'tags': ['TestPage', 'TestTag']
    },

]


class Paths:

    GWIKI = {
        'page': "https://172.20.0.2/collab/{}",
        'resource': {
            'asset': "",
            'mapping': "",
            'tag': "",
        }
    }

    NODE = {
        'page': "http://localhost:3000/test/{}.html",
        'resource': {
            'asset': "http://localhost:3000/asset/{}",
            'mapping':"http://localhost:3000/mapping/{}",
            'tag': "http://localhost:3000/tag/{}",
        }
    }

    def __init__(self, debug=False):
        if debug:
            self.paths = Paths.NODE
        else:
            self.paths = Paths.GWIKI

    def get_path(self, resource, id, page=False):
        if page:
            return self.get_page_path(resource, id)
        else:
            return self.get_resource_path(resource, id)

    def get_page_path(self, id, updated=False):
        """
        :param id: PageName
        :param updated: For debugging, updated
        flag tells if updated page need to be
        fetched. If not debugging this has no effect.
        :return: path where from get the page
        """
        if updated:
            # for testing page updates
            # PageName-updated.html
            id = "{}-updated".format(id)

        return self.paths['page'].format(id)

    def get_resource_path(self, resource, id):
        return self.paths['resource'][resource].format(id)


def pytest_sessionstart(session):
    """ before session.main() is called. """
    print("\nCreate MoinMoin test pages for tests here.\n")

    r = requests.get("http://localhost:3000/reset-models")

    print(r)

    print("create pages:")
    [pprint(p) for p in pages]

    print("create tags:")
    [pprint(t) for t in tags]

    print("create mappings:")
    [pprint(m) for m in mappings]


def pytest_sessionfinish(session, exitstatus):
    """ whole test run finishes. """
    print("\n\nRemove the test pages here.\n")


"""  Define api paths here  """
WIKI_IP_HOST = "https://172.20.0.2"
"""
this is used for checking that links created
in pages has the format WIKI_IP_HOST/WIKI_PREPATH/LINK_TARGET
"""
WIKI_PATH = "/collab/"
WIKI_ROOT = WIKI_IP_HOST + WIKI_PATH
API_ROOT = "https://172.20.0.2/collab/?action=API&debug=True"
API_ASSETS = API_ROOT + '&resource=asset'
API_DEPENDENCIES = API_ROOT + '&resource=dependency'
API_MAPPINGS = API_ROOT + '&resource=mapping'
API_TAGS = API_ROOT + '&resource=tag'

PAGE_EDIT = "{host}{path}{page}?action=edit"

# node server for checking the tests
NODE_HOST = "http://localhost:3000/{resource}/{id}"
NODE_TEST_PAGES = "http://localhost:3000/test/{}.html"


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
        'connected_to': dependencies,
        'tags': tags
    }


def tag(name, description):
    return {
        'name': name,
        'description': description,
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
    return "{root}?action=API&resource={type}&id={id}" \
        .format(root=API_ROOT, type=resource_type, id=resource_id)


def get_resource(resource_type, resource_id):
    url = build_query_url(resource_type, resource_id)
    return requests.get(url, verify=False, auth=credentials)
