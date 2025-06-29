from django.shortcuts import render, redirect
from django.contrib.auth import login
from .forms import BootstrapRegisterForm

# def register_view(request):
#     return render(request, "register.html")

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