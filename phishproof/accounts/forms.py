from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User

class BootstrapLoginForm(AuthenticationForm):
    username = forms.CharField(
        widget=forms.TextInput(attrs={'class': 'form-control form-input', 'placeholder': 'Username'})
    )

    password = forms.CharField(
        widget=forms.PasswordInput(attrs={'class': 'form-control form-input', 'placeholder': 'Password'})
    )
    remember_me = forms.BooleanField(
        required=False,
        widget=forms.CheckboxInput(attrs={
            "type": "checkbox",
            "class": "form-check-input",
            "id": "remember",
            "name": "remember"
        }),
        label="Remember me"
    )

    remember_me = forms.BooleanField(
        required=False,  # Make it optional
        widget=forms.CheckboxInput(attrs={'class': 'form-checkbox'}),
    )
    

class BootstrapRegisterForm(UserCreationForm):
    email = forms.EmailField(
        required=False,
        widget=forms.EmailInput(attrs={
            'class': 'form-input',
            'placeholder': 'Enter your email address (optional)'
        })
    )
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
        # Style the form fields
        self.fields['username'].widget.attrs.update({
            'class': 'form-input',
            'placeholder': 'Choose a unique username'
        })
        
        self.fields['password1'].widget.attrs.update({
            'class': 'form-input',
            'placeholder': 'Create a strong password'
        })
        
        self.fields['password2'].widget.attrs.update({
            'class': 'form-input',
            'placeholder': 'Confirm your password'
        })
        
        # Customize help text to be more user-friendly
        self.fields['username'].help_text = 'This will be your display name on the platform'
        self.fields['password1'].help_text = 'Must be at least 8 characters with letters and numbers'
        self.fields['password2'].help_text = None  # Remove default help text
