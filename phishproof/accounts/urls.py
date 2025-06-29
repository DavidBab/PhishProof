from django.urls import path
from . import views
from django.contrib.auth import views as auth_views
from .forms import BootstrapLoginForm
from accounts.views import CustomLoginView
urlpatterns = [
    # path('login/', views.login_view, name='login_view'),  
    # path('register/', views.register_view, name='register_view'),  
    path('login/', views.login_view, name='login'),

    path('logout/', auth_views.LogoutView.as_view(next_page="/auth/login"), name='logout'),

    path('register/', views.register_view, name='register'),
]