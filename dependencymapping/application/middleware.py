import logging

logger = logging.getLogger(__name__)

class HeaderManagerMiddleware:

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        logger.critical("\n %%%%%% HeaderManagerMiddleware %%%%% \n")
        response = self.get_response(request)
        response['X-My-Header'] = "my value"
        return response