#from MoinMoin.PageEditor import PageEditor
#from MoinMoin.wikiutil import normalize_pagename

from graphingwiki.plugin.action.api import (
    asset_handler,
    dependency_handler,
    mapping_handler,
    tag_handler
)
from graphingwiki import values_to_form

import logging

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

RESOURCE = "resource"
ID = "id"

ASSET = "asset"
DEPENDENCY = "dependency"
MAPPING = "mapping"
TAG = "tag"

API_RESOURCE ="?action=API&resource={}"


def get_request_body(request):
    try:
        return json.loads(request.stream.read())
    except Exception as ex:
        return {'error': str(ex)}


def get_url_params(request):
    try:
        return values_to_form(request.values)
    except Exception as ex:
        return {
            'body': "no request body",
            'debug': str(ex)
        }


options = {
    ASSET:      API_RESOURCE.format(ASSET),
    DEPENDENCY: API_RESOURCE.format(DEPENDENCY),
    MAPPING:    API_RESOURCE.format(MAPPING),
    TAG:        API_RESOURCE.format(TAG),
}

resource_handlers = {
    'asset': asset_handler,
    'dependency': dependency_handler,
    'mapping': mapping_handler,
    'tag': tag_handler
}

try:
    import simplejson as json
except ImportError:
    import json



def send_fault(request, msg):
    request.write(json.dumps(dict(status="error", errmsg=msg)))


def execute(pagename, request):
    """
    :param pagename: Redundant here, MoinMoin.Action pattern..
    :param request:
    :return:
    """

    url_params = get_url_params(request)
    request.headers["Content-Type"] = "application/json; charset=ascii"
    response_body = dict()

    request_body = get_request_body(request)
    print("\n##########  Here starts the API.execute() ##########\n")

    logger.debug(request_body)
    logger.debug(url_params)



    try:
        debug = url_params['debug']
    except Exception as ex:
        debug = False


    method = request.environ['REQUEST_METHOD']

    """ Check if resource parameter is set """
    try:
        resource = url_params[RESOURCE][0]
    except Exception as ex:
        resource = False

    """ Check if id parameter is set """
    try:
        id = url_params[ID][0]
    except Exception as ex:
        id = False

    """ if resource and id not present in request """
    if not resource and not id:
        # Return options
        request.write(json.dumps(options))
        return

    if debug:
        """ 
            If request is sent with debug=True 
            echo the request params
        """
        response_body['url_params'] = url_params
        if request_body:
            response_body['request_body'] = response_body

    try:
        """ Handle the request """

        response = resource_handlers[resource](
            request, method, url_params, request_body
        )
        response_body['data'] = response
        request.write(json.dumps(response))

    except KeyError as ex:
        request.status_code = 404
        request.write(json.dumps({
            'key_used': resource,
            'handler_keys': resource_handlers.keys(),
            'handlers': [str(handler) for handler in resource_handlers.values()],
            'error': str(ex),
            'msg': "KeyError with: url_params['resource']",
            'url_params': json.dumps(url_params),
        }))

    print("\n Here API.execute() ends\n")