from django.contrib.auth.models import User, Group
from application.models import Tag, Resource, DependencyMap
from rest_framework import viewsets
from application.serializers import DependencyMapSerializer, UserSerializer, GroupSerializer, TagSerializer, ResourceSerializer
from django.core import serializers
import json

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
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


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

    queryset = DependencyMap.objects.all()
    serializer_class = DependencyMapSerializer




