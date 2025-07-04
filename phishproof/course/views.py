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
    # Get all courses
    courses = Course.objects.all()
    
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
    
    # Sort courses by status priority
    status_priority = {
        'completed': 1,
        'in_progress': 2,
        'not_started': 3
    }
    
    courses = sorted(courses, key=lambda x: status_priority.get(x.status, 3))
    
    context = {
        'courses': courses,
    }
    
    return render(request, "learn.html", context)


@login_required
def lab(request):
    return render(request, "lab.html")


@login_required
def profile(request):
    # Get user statistics
    user_progress = UserCourseProgress.objects.filter(user=request.user)
    completed_courses = user_progress.filter(status='completed').count()
    total_courses = Course.objects.count()
    
    # Get last 3 in-progress courses with course details
    last_three = list(
        user_progress.filter(status='in_progress')
        .select_related('course')  # This joins with the Course table
        .order_by('-id')[:3]
    )

    # Calculate progress percentage for each course
    for i in last_three:
        if i.course.modules > 0:
            i.progress = round((i.modules_done / i.course.modules) * 100)
        else:
            i.progress = 0
    
    
    context = {
       'user': request.user.username,
        'email': request.user.email,
        'is_active': request.user.is_active,
        'user_since': request.user.date_joined.strftime('%B %Y'),
        'completed_courses': completed_courses,
        'total_courses': total_courses,
        'courses_in_progress_count': user_progress.filter(status='in_progress').count(),
        'courses_in_progress': last_three,
    }

    return render(request, "profile.html", context)