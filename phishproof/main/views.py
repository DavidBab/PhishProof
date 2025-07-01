from django.shortcuts import render, redirect
from .forms import SubscriberForm
from main.models import Course

# Create your views here.
def index(request):
    courses = Course.objects.all()

    print(f"Found {courses} courses")
    
    context = {
        'courses': courses,
    }
    

    return render(request, "index.html", context)


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