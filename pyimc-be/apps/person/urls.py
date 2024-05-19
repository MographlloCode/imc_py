from django.urls import path
from .views import PersonViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'people', PersonViewSet)