from django.db import models

class Application(models.Model):
    DEPARTMENTS =[
    ("Computer Science", "Computer Science"),
    ("Information Technology", "Information Technology"),
    ("Electronics & Communication", "Electronics & Communication"),
    ("Mechanical Engineering", "Mechanical Engineering"),
    ("Civil Engineering", "Civil Engineering"),
    ("Electrical Engineering", "Electrical Engineering"),
    ("Business Administration", "Business Administration"),
    ("Mathematics", "Mathematics"),
    ("Physics", "Physics"),
    ("Chemistry", "Chemistry"),
    ("English", "English"),
    ("Economics", "Economics"),
    ("Psychology", "Psychology"),
    ("Other", "Other"),
    ]
    
    username = models.CharField(max_length=100)
    email = models.EmailField(max_length=254)
    phone = models.CharField(max_length=10)
    workplace = models.CharField(max_length=100)
    department = models.CharField(max_length=50, choices=DEPARTMENTS)
    custom_department = models.CharField(max_length=128, blank=True, default="")
    workplacename = models.CharField(max_length=100)
    experience = models.DecimalField(max_digits=5, decimal_places=2 , default=0)
    resume = models.FileField(upload_to='resumes/')
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username



# Create your models here.
