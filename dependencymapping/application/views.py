from django.contrib.auth.models import User, Group
from application.models import Tag, Resource, DependencyMap
from rest_framework import viewsets
from application.serializers import DependencyMapSerializer, UserSerializer, GroupSerializer, TagSerializer, \
    ResourceSerializer
from rest_framework.permissions import AllowAny
from django.views.generic import View
from django.http import HttpResponse
from django.conf import settings
import os

from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.schemas import SchemaGenerator
from rest_framework.views import APIView
from rest_framework_swagger import renderers


class SwaggerSchemaView(APIView):
    permission_classes = [AllowAny]
    renderer_classes = [
        renderers.OpenAPIRenderer,
        renderers.SwaggerUIRenderer
    ]

    def get(self, request):
        generator = SchemaGenerator()
        schema = generator.get_schema(request=request)

        return Response(schema)


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class TagViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows tags to be viewed or edited.
    The tags are used for categorizing assets.
    """
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

    permission_classes = (AllowAny,)
    allowed_methods = ['get', 'post', 'put', 'delete']


class ResourceViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """

    def create(self, request, *args, **kwargs):
        data = request.data
        print(dir(request))

        print("name: {} description: {}".format(data['name'], data['description']))
        print("resources count: {}.".format(len(data['connected_to'])))
        return super(ResourceViewSet, self).create(request, *args, **kwargs)

    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer


class DependencyMapViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """

    permission_classes = (AllowAny,)
    queryset = DependencyMap.objects.all()
    serializer_class = DependencyMapSerializer
    allowed_methods = ['get', 'post', 'put', 'delete']

    def create(self, request, *args, **kwargs):
        data = request.data
        print("\n######## Viewset create #########")

        resources = data['resources']

        print(type(data['resources']))
        print(data['resources'])
        print("end bug \n")

        print("name: {} description: {}".format(data['name'], data['description']))
        print("resources count: {}.".format(data['resources']))

        print("\n#################################")

        return super(DependencyMapViewSet, self).create(request, args, kwargs)

    def destroy(self, request, *args, **kwargs):
        print('destroy')
        return super(DependencyMapViewSet, self).destroy(request, *args, **kwargs)


