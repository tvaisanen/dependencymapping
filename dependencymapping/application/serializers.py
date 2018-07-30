from django.contrib.auth.models import User, Group
from application.models import DependencyMap, Tag, Resource
from rest_framework import serializers
from rest_framework.parsers import JSONParser
import json
from rest_framework.validators import UniqueTogetherValidator

"""

Serialize the models from database to JSON representations.

"""


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

    def create(self, validated_data):
        print("####### resource serializer create ##########\n")

        new_resource = Resource(**validated_data)
        new_resource.save()

        try:
            tag_names = json.loads(self.initial_data['tags'])
            resource_data = json.loads(self.initial_data['connected_to'])

            resource_names = [r['name'] for r in resource_data]

            resources = list(
                filter(
                    lambda r: r.name in resource_names,
                    Resource.objects.all()
                )
            )

            tags = list(
                filter(
                    lambda t: t.name in tag_names,
                    Tag.objects.all()
                )
            )

            [print(r) for r in resources]
            new_resource.connected_to.add(*resources)
            new_resource.tags.add(*tags)
        except Exception as ex:
            print(ex)

        print("####################################")
        return new_resource

    def update(self, instance, validated_data):
        print("####### serializer actionUpdate ##########\n")

        resource_data = json.loads(self.initial_data['connected_to'])
        tag_names = json.loads(self.initial_data['tags'])
        print(tag_names)

        resource_names = [r['name'] for r in resource_data]

        try:
            resources = list(
                filter(
                    lambda r: r.name in resource_names,
                    Resource.objects.all()
                )
            )

            instance.connected_to.clear()
            instance.connected_to.add(*resources)
        except Exception as ex:
            print(ex)

        try:
            tags = list(
                filter(
                    lambda t: t.name in tag_names,
                    Tag.objects.all()
                )
            )
            instance.tags.clear()
            instance.tags.add(*tags)
        except Exception as ex:
            print(ex)



        print("####################################")
        return super(ResourceSerializer, self).update(instance, validated_data)


class DependencyMapSerializer(serializers.ModelSerializer):
    class Meta:
        model = DependencyMap
        fields = ('name', 'description', 'resources', 'tags')
        depth = 2

    def create(self, validated_data):
        print("####### serializer create ##########\n")

        resource_data = json.loads(self.initial_data['resources'])
        tag_names = json.loads(self.initial_data['tags'])
        print(tag_names)

        resource_names = [r['name'] for r in resource_data]

        resources = list(
            filter(
                lambda r: r.name in resource_names,
                Resource.objects.all()
            )
        )

        tags = list(
            filter(
                lambda t: t.name in tag_names,
                Tag.objects.all()
            )
        )

        new_dependency_map = DependencyMap(**validated_data)
        new_dependency_map.save()
        new_dependency_map.resources.add(*resources)
        new_dependency_map.tags.add(*tags)
        print("####################################")
        return new_dependency_map

    def update(self, instance, validated_data):
        print("####### serializer actionUpdate ##########\n")

        resource_data = json.loads(self.initial_data['resources'])
        tag_names = json.loads(self.initial_data['tags'])
        print(tag_names)

        resource_names = [r['name'] for r in resource_data]

        resources = list(
            filter(
                lambda r: r.name in resource_names,
                Resource.objects.all()
            )
        )

        tags = list(
            filter(
                lambda t: t.name in tag_names,
                Tag.objects.all()
            )
        )

        instance.resources.clear()
        instance.tags.clear()

        instance.resources.add(*resources)
        instance.tags.add(*tags)
        print("####################################")
        return super(DependencyMapSerializer, self).update(instance, validated_data)
