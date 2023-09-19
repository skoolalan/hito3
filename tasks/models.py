from django.db import models

# Create your models here.
class Users(models.Model):
    name = models.CharField(max_length=100, blank=True)
    lastname = models.CharField(max_length=100 ,blank=True)
    cuil = models.CharField(max_length=11, unique=True)
    password = models.CharField(max_length=100, blank=True)
    email = models.CharField(max_length=100, blank=True)

class Task(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    done = models.BooleanField(default=False)
    time = models.TimeField(null=True, blank=True)  # Configuración para el campo time
    date = models.DateField(null=True, blank=True)  # Configuración para el campo date
    task = models.ForeignKey(Users, on_delete=models.CASCADE, default=1)

    def __str__(self):
        return self.title
