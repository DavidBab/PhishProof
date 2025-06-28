from django import forms
from .models import Subscriber

class SubscriberForm(forms.ModelForm):
    agree_to_terms = forms.BooleanField(
        required=True,
        widget=forms.CheckboxInput(attrs={
            'class': 'form-check-input',
            'id': 'termsCheck'
        })
    )
    class Meta:
        model = Subscriber
        fields = ['email']
        widgets = {
            'email': forms.EmailInput(
                attrs={
                    'class': 'form-control', 
                    'placeholder': 'info@example.com', 
                    'aria-describedby':'emailHelp'
                }
            )
        }

