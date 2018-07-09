from django.contrib.auth.models import User, Group
from application.models import Tag, Resource, DependencyMap
from rest_framework import viewsets
from application.serializers import DependencyMapSerializer, UserSerializer, GroupSerializer, TagSerializer, ResourceSerializer


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
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer


class DependencyMapViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """

    queryset = DependencyMap.objects.all()
    serializer_class = DependencyMapSerializer




