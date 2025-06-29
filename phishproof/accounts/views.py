from django.contrib.auth.views import LoginView
from django.shortcuts import render, redirect
from django.contrib.auth import login
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

class CustomLoginView(LoginView):
    authentication_form = BootstrapLoginForm

    def form_valid(self, form):
        # Set session expiry depending on "remember me"
        remember = form.cleaned_data.get('remember_me')
        if not remember:
            self.request.session.set_expiry(0)  # session ends on browser close
        return super().form_valid(form)