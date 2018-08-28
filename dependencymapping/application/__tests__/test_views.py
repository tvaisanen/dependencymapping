from rest_framework.test import APITestCase
from rest_framework.test import APIRequestFactory

from dependencymapping.application import views


class TestApplication(APITestCase):

    def setUp(self):
        self.factory = APIRequestFactory()
        self.view = views.DependencyMapViewSet.as_view({'get':'list'})
        self.uri = '/mappings/'

    def test_list(self):
        request = self.factory.get(self.uri)
        response = self.view(request)
        self.assertEqual(response.status_code, 200,
                         'Expected Response Code 200, received  {0} instead.'
                         .format(response.status_code))
