from django.shortcuts import render, redirect
from .forms import SubscriberForm

# Create your views here.
def index(request):
    form = SubscriberForm()
    

    return render(request, "index.html", {"form": form})


def about(request):
    return render(request, "about.html")

def subscribe(request):
    if request.method == "POST":
        form = SubscriberForm(request.POST)
        if form.is_valid():
            form.save()
            return render(request, "subscribe.html")
        redirect("index")
    else:
        redirect("index")