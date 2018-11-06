import logging

from .common import GET, PUT, POST, DELETE

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

ASSET_NOT_FOUND = "Resource asset: {} does not exist."
ASSET_CREATED = "Resource asset: {} created successfully."

""" For Testing """


def error(msg):
    return {'error': msg}


asset_db = dict()


def db_get(name):
    return asset_db['name']


def db_post(data):
    try:
        id = data['name']
        asset_db[id] = data
        return {
            'msg': ASSET_CREATED.format(id),
            'data': asset_db[id]
        }
    except KeyError as ex:
        return {"error": "field name is required."}


def db_put(data):
    return {"msg": "Todo"}


def db_delete(data):
    return {"msg": "Todo"}

###################

def asset(name, description, dependencies, tags):
    return {
        'name': name,
        'description': description,
        'dependencies': dependencies,
        'tags': tags
    }


""" Here """
method_handlers = {
    GET:    db_get,
    POST:   db_post,
    PUT:    db_put,
    DELETE: db_delete
}


def asset_handler(request, method="GET", params={}, body={}, *args, **kwargs):
    print("\n ####### asset_handler() ##########\n")
    print("method: {}".format(method))

    try:
        id = params['id'][0]
    except KeyError as ex:
        id = False

    try:
        """ If id is provided, return detail """
        # asset_data = request.graphdata.getpage(asset_id)
        if id:
            return method_handlers[method](id)

    except KeyError as kex:
        request.status_code = 404
        return error(ASSET_NOT_FOUND.format(id))

    except Exception as ex:
        return {
            "TODO": "Implement asset handler {}".format(method),
            "error": str(ex),
            "data": asset("name", "description", "[dep_ids,..]", "[tags...]")
        }
