from . import views
from django.urls import path

urlpatterns = [
    path('cakebuilder/', views.cakebuilder_app, name='cakebuilder'),
    path("api/available-slots/", views.available_slots, name="available-slots"),
]
