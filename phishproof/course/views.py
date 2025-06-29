from django.shortcuts import render
from django.contrib.auth.decorators import login_required

# Create your views here.
@login_required
def dashboard(request):
    context = {
        'user': request.user.username,
        'total_courses': 5,
        'completed_courses': 2,
    }

    return render(request, "dashboard.html", context)