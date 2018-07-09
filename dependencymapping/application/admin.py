from django.contrib import admin
from application.models import (
 Tag, Resource, DependencyMap

)
# Register your models here.


admin.site.register(Tag)
admin.site.register(Resource)
admin.site.register(DependencyMap)

