import requests
import json
import pytest
from pprint import pprint

"""  Define api paths here"""

API_ROOT = "https://172.20.0.3/collab/?action=API&debug=True"
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

