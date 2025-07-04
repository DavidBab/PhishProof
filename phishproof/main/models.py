from django.db import models

# Create your models here.
class Subscriber(models.Model):
    email = models.EmailField(unique=True, blank=False, null=False)
    subscribed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email
    

class Course(models.Model):
    DIFFICULTY_CHOICES = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    difficulty = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES)
    course_duration = models.IntegerField(default=0)
    modules = models.IntegerField(default=0)

    class Meta:
        db_table = 'courses'

    def __str__(self):
        return self.title