from django.urls import path
from . import views

urlpatterns = [
    path('dashboard/', views.dashboard, name="dashboard"),
    path('learn/', views.learn, name="learn"),
    path('lab/', views.lab, name="lab"),
    path('profile/', views.profile, name="profile")
]