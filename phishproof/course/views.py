from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from main.models import Course
from .models import UserCourseProgress

# Create your views here.
@login_required
def dashboard(request):
    # Get all courses
    courses = Course.objects.all()
    total_courses = courses.count()
    
    user_progress_dict = {
        up.course_id: up for up in 
        UserCourseProgress.objects.filter(user=request.user)
    }

    # Add progress data to each course
    for course in courses:
        progress = user_progress_dict.get(course.id)
        if progress:
            course.status = progress.status
            course.progress_percentage = progress.progress
        else:
            course.status = 'not_started'
            course.progress_percentage = 0
    
    # Sort courses by status priority: completed -> in_progress -> not_started
    status_priority = {
        'completed': 1,
        'in_progress': 2,
        'not_started': 3
    }
    
    courses = sorted(courses, key=lambda x: status_priority.get(x.status, 3))
    
    # Calculate stats
    completed_courses = sum(1 for course in courses if getattr(course, 'status', None) == 'completed')
    in_progress_courses = sum(1 for course in courses if getattr(course, 'status', None) == 'in_progress')

    # Calculate overall progress percentage
    if total_courses > 0:
        overall_progress = round((completed_courses / total_courses) * 100)
    else:
        overall_progress = 0
    
    # Calculate day streak 
    day_streak = 0  # TODO: Implement actual streak calculation
    
    context = {
        'user': request.user.username,
        'total_courses': total_courses,
        'completed_courses': completed_courses,
        'in_progress_courses': in_progress_courses,
        'overall_progress': overall_progress,
        'day_streak': day_streak,
        'courses': courses,
    }

    return render(request, "dashboard.html", context)


@login_required
def learn(request):
    return render(request, "learn.html")


@login_required
def lab(request):
    return render(request, "lab.html")


@login_required
def profile(request):
    # Get user statistics
    user_progress = UserCourseProgress.objects.filter(user=request.user)
    completed_courses = user_progress.filter(status='completed').count()
    total_courses = Course.objects.count()
    
    context = {
        'user_since': request.user.date_joined.strftime('%B %Y'),
        'completed_courses': completed_courses,
        'total_courses': total_courses,
        'courses_in_progress': user_progress.filter(status='in_progress').count(),
    }

    return render(request, "profile.html", context)