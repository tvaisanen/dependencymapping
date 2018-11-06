import logging

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)


def dependency_handler(request, params, body, method, *args, **kwargs):
    print("\n ####### asset_handler() ##########\n")
    print("method: {}".format(method))
    print("params: id={}".format(params['id'][0]))

    try:
        asset_id = params['id'][0]
        logger.debug("asset_handler(params, body)")
        logger.debug("\tparams: {}".format(params))
        logger.debug("\tbody: {}".format(body))
        logger.debug(args)
        logger.debug(kwargs)
        asset_data = request.graphdata.getpage(asset_id)
        print("\nasset_data:")
        print(asset_data)
        return asset_data
    except Exception as ex:
        print("Exception with asset_handler")
        pass


    return {"data": "TODO: Implement dependency handler"}
