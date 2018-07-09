from django.contrib.auth.models import User, Group
from application.models import  DependencyMap, Tag, Resource
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')


class TagSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Tag
        fields = ('name', 'description')


class ResourceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Resource
        fields = '__all__'
        depth = 2


class DependencyMapSerializer(serializers.ModelSerializer):

    class Meta:
        model = DependencyMap
        fields = '__all__'
        depth = 2

