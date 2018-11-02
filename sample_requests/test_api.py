import requests
import json

API_ROOT = "https://172.20.0.4/?action=API&debug=True"

## RELOAD THE uWSGI app inside the container
## uwsgi --reload /run/uwsgi-moinmoin.pid

#  tvaisanen/gwiki-with-moin
#     user: collab
#     pw:   iZrxL/SO07+0BoxWeHx/i4ihprI0EaDmZQxLr9jNAu0=


def build_query_url(resource_type, resource_id):
    return "{root}?action=API&resource={type}&id={id}"\
        .format(root=API_ROOT, type=resource_type, id=resource_id)


def get_resource(resource_type, resource_id):
    url = build_query_url(resource_type, resource_id)
    return requests.get(url, verify=False)


def get_root():
    r = requests.get(API_ROOT, verify=False)
    return r.content


def get_response_content(response):
    print(response.content)
    try:
        return json.loads(response.decode('utf-8'))
    except Exception as ex:
        return None


def test_api_root():
    r = get_root()
    decoded = r.decode('utf-8')
    response_body = json.loads(decoded)
    print(response_body)
    print(type(response_body))
    try:
        assets_url = response_body['assets'][0]
        assert assets_url == "{root}?action=API&resource=assets"\
            .format(root=API_ROOT)
    except Exception as ex:
        assert False


def test_assets_root():
    r = requests.get("{root}&resource=asset".format(root=API_ROOT))
    assert False


def test_mappings_root():
    print("implement here")
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
