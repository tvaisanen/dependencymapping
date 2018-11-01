from MoinMoin.PageEditor import PageEditor
from MoinMoin.wikiutil import normalize_pagename

from graphingwiki.plugin.action.api.asset import asset_handler
from graphingwiki import values_to_form

import logging

logger = logging.getLogger(__name__)


def get_request_body(request):
    try:
        return json.loads(request.stream.read())
    except Exception as ex:
        return {'error': str(ex)}


def get_url_params(request):
    try:
        return values_to_form(request.values)
    except Exception as ex:
        return {'error': str(ex)}


options = {
    "assets":   "?action=API&resource=asset",
    "mappings": "?action=API&resource=mappings",
    "tags":     "?action=API&resource=tags",
}

resource_handlers = {
    'asset': asset_handler,
}

try:
    import simplejson as json
except ImportError:
    import json


def write_response(request, payload):
    request.write(json.dumps(payload))


def sendfault(request, msg):
    request.write(json.dumps(dict(status="error", errmsg=msg)))


def execute(pagename, request):
    url_params = get_url_params(request)
    request.headers["Content-Type"] = "application/json; charset=ascii"
    response_body = dict()

    request_body = get_request_body(request)

    logger.debug(request_body)
    logger.debug(url_params)

    try:
        debug = url_params['debug']
    except Exception as ex:
        debug = False

    if debug:
        response_body['url_params'] = url_params
        if request_body:
            response_body['request_body'] = response_body

    try:

        resource = url_params['resource'][0]
        response = resource_handlers[resource](request, url_params, request_body)
        response_body.update(response)
        write_response(request, response_body)

    except Exception as ex:
        error_response = dict(error=str(ex))
        error_response.update(options)
        error_response['msg'] = "helo"
        request.write(json.dumps(error_response))
