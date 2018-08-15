from django.db import models


class Tag(models.Model):
    name = models.CharField(max_length=100, primary_key=True)
    description = models.CharField(max_length=300, blank=True)

    def __str__(self):
        return self.name


class Resource(models.Model):
    name = models.CharField(max_length=100, primary_key=True)
    description = models.TextField(blank=True)
    # todo: dependencies through="Dependency"
    connected_to = models.ManyToManyField("Resource", blank=True)
    tags = models.ManyToManyField("Tag", blank=True)

    def __str__(self):
        return self.name


class DependencyMap(models.Model):
    name = models.CharField(max_length=100, primary_key=True)
    description = models.TextField()
    resources = models.ManyToManyField("Resource", related_name="resources")
    tags = models.ManyToManyField("Tag", related_name="tags")

    def __str__(self):
        return self.name

"""

class Person(models.Model):
    name = models.CharField(max_length=128)

    def __str__(self):              # __unicode__ on Python 2
        return self.name

class Group(models.Model):
    name = models.CharField(max_length=128)
    members = models.ManyToManyField(Person, through='Membership')

    def __str__(self):              # __unicode__ on Python 2
        return self.name

class Membership(models.Model):
    person = models.ForeignKey(Person)
    group = models.ForeignKey(Group)
    date_joined = models.DateField()
    invite_reason = models.CharField(max_length=64)

"""

