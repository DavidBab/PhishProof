from django.db import models
from django.contrib.auth.models import User

# Create your models here.
from main.models import Course

class UserCourseProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    progress = models.IntegerField(default=0)
    status = models.CharField(max_length=50, default='not_started')
    started_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'course')
        db_table = 'user_course_progress'

    def __str__(self):
        return f"{self.user.username} - {self.course.title}"
