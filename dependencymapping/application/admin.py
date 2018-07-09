from django.contrib import admin
from application.models import (
 SemanticCategory, Resource, DependencyMap

)
# Register your models here.


admin.site.register(SemanticCategory)
admin.site.register(Resource)
admin.site.register(DependencyMap)

