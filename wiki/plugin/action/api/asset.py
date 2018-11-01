
import logging

logger = logging.getLogger(__name__)


def asset_handler(requst, params, body, *args, **kwargs):
    logger.debug("asset_handler(params, body)")
    logger.debug("\tparams: {}".format(params))
    logger.debug("\tbody: {}".format(body))
    return {"data": "TODO: Implement asset handler"}

