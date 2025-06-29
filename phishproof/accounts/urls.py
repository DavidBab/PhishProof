from django.urls import path
from . import views
from django.contrib.auth import views as auth_views
from .forms import BootstrapLoginForm
urlpatterns = [
    # path('login/', views.login_view, name='login_view'),  
    # path('register/', views.register_view, name='register_view'),  
    path('login/', 
         auth_views.LoginView.as_view(
             template_name='accounts/login.html', 
             authentication_form=BootstrapLoginForm
            ), 
         name='login'
        ),
    path('logout/', auth_views.LogoutView.as_view(next_page="/accounts/login"), name='logout'),

    path('register/', views.register_view, name='register'),
]