from django.shortcuts import render

# Create your views here.
def dashboard(request):
    context = {
        'user': 'David',
        'total_courses': 5,
        'completed_courses': 2,
    }

    return render(request, "dashboard.html", context)