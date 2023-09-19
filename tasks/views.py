from rest_framework import viewsets
from .serializer import TaskSerializer, UsersSerializer
from .models import Task
from .models import Users
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login

class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
# Create your views here.
class UsersView(viewsets.ModelViewSet):
    serializer_class = UsersSerializer
    queryset = Users.objects.all()

  
@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        cuil = request.POST.get('cuil')
        password = request.POST.get('password')

        # Autenticar al usuario
        users = authenticate(request, cuil=cuil, password=password)

        if users is not None:
            # Iniciar sesión
            login(request, users)
            return JsonResponse({'message': 'Inicio de sesión exitoso'})
        else:
            return JsonResponse({'error': 'Credenciales inválidas'}, status=400)

    return JsonResponse({'error': 'Método no permitido'}, status=405)