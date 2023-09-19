from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
from tasks import views
from . import views
router = routers.DefaultRouter()
router.register(r'tasks',views.TaskView, 'tasks' )
router.register(r'users',views.UsersView, 'users' )


urlpatterns = [
    path("api/v1/", include(router.urls)),
#    path("api/v1/tasks/", include(router.urls)),
#    path("api/v1/users/", include(router.urls)),
    path('docs/', include_docs_urls(title="Tasl API")),
    path('tasks/api/v1/users/', views.login_view, name='login_view'),

]