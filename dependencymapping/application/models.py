from django.db import models


class SemanticCategory(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=300, blank=True)

    def __str__(self):
        return self.name


class Resource(models.Model):
    name = models.CharField(max_length=100, primary_key=True)
    description = models.TextField(blank=True)
    connected_to = models.ManyToManyField("Resource", blank=True)
    categories = models.ManyToManyField("SemanticCategory", blank=True)

    def __str__(self):
        return self.name


class DependencyMap(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    resources = models.ManyToManyField("Resource", blank=True)
    categories = models.ManyToManyField("SemanticCategory", blank=True)

    def __str__(self):
        return self.name



