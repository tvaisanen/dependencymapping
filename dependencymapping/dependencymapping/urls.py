"""dependencymapping URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='hoemanticCategory)
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.conf.urls import url, include, re_path
from rest_framework import routers
from rest_framework.authtoken import views as rest_views
from application import views
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_swagger.views import get_swagger_view
from rest_framework.documentation import include_docs_urls


schema_view = get_swagger_view(title='Depedendency Mapper API')

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'tags', views.TagViewSet)
router.register(r'resources', views.ResourceViewSet)
router.register(r'resources-detail', views.ResourceViewSet)
router.register(r'mappings', views.DependencyMapViewSet)

admin.site.site_header = "Dependency Mapper - Panel"
admin.site.site_title = "Dependency Mapping - Panel"
admin.site.index_title = "Dependency Mapper"

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^schema/', views.SwaggerSchemaView.as_view()),
    url('grappelli/', include('grappelli.urls')),
    url(r'^admin/', admin.site.urls),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^swagger-docs/', schema_view),
    url(r'^docs/', include_docs_urls(title="Dependency Mapper API", public=False)),
    url(r'^', include(router.urls)),
    url(r'^api-token-auth/', rest_views.obtain_auth_token),
    url(r'^app/', TemplateView.as_view(template_name='index.html'))
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)