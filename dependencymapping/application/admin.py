from django.contrib import admin
from application.models import (
 Tag, Asset, DependencyMap, AssetState

)
# Register your models here.


admin.site.register(Tag)
admin.site.register(Asset)
admin.site.register(DependencyMap)
admin.site.register(AssetState)

