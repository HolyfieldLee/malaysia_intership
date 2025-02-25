from django.db import models

class Resource(models.Model):
    campus = models.CharField(max_length=255)
    resource_code = models.CharField(max_length=50, unique=True)
    description = models.TextField()
    capacity = models.IntegerField(null=True, blank=True)  # NULL 값 허용
    lecture = models.BooleanField(default=False)
    tutorial = models.BooleanField(default=False)
    lab = models.BooleanField(default=False)
    workshop = models.BooleanField(default=False)
    resource_status = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.resource_code} - {self.description}"

class CourseOffer(models.Model):
    course_code = models.CharField(max_length=50)
    faculty_code = models.CharField(max_length=50)
    session = models.TextField()
    capacity = models.IntegerField(null=True, blank=True)  # NULL 값 허용
    min_per_session = models.IntegerField()
    lecturer = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.course_code} - {self.session}"