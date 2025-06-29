from django.contrib.auth.views import LoginView
from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from .forms import BootstrapRegisterForm, BootstrapLoginForm


def register_view(request):
    if request.method == 'POST':
        form = BootstrapRegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('/app/dashboard')
    else:
        form = BootstrapRegisterForm()
    return render(request, 'auth/register.html', {'form': form})


def login_view(request):
    if request.method == 'POST':
        form = BootstrapLoginForm(request, data=request.POST)
        
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            remember_me = form.cleaned_data.get('remember_me', False)
            
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                
                # Handle remember me
                if remember_me:
                    request.session.set_expiry(2592000)  # 30 days
                else:
                    request.session.set_expiry(0)  # Browser session only
                
                return redirect('/app/dashboard')
            else:
                # Add custom error for invalid login
                form.add_error(None, 'Invalid username or password. Please check your credentials and try again.')
        
        # If form is not valid, Django will automatically handle field validation errors
    else:
        form = BootstrapLoginForm()
    
    return render(request, 'auth/login.html', {'form': form})