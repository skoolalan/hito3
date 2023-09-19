from rest_framework import serializers
from .models import Task, Users
class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'  # O selecciona los campos específicos que deseas incluir
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
       # fields = ('id', 'title', 'description', 'done', 'time', 'date', 'task')
       model = Task
       fields = '__all__'