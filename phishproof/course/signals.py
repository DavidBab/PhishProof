from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from main.models import Course
from .models import UserCourseProgress

@receiver(post_save, sender=User)
def create_user_course_progress_for_new_user(sender, instance, created, **kwargs):
    """
    Create UserCourseProgress entries for all courses when a new user is created
    """
    if created:  # Only run when a new user is created
        courses = Course.objects.all()
        for course in courses:
            UserCourseProgress.objects.create(
                user_id=instance.id,
                course_id=course.id,
                status='not_started',
                progress=0,
                modules_done=0
            )

