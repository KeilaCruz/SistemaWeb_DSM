from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from gestion_pacientes.models import Evento
from .serializers import EventoSerializer
from datetime import datetime, timedelta

@permission_classes([IsAuthenticated])
class EventoAPIView(APIView):
    def get(self, request):
        eventos = Evento.objects.all()
        evento_serializer = EventoSerializer(eventos, many=True)
        return Response(evento_serializer.data)
    

@permission_classes([IsAuthenticated])
class RegistrarEventoAPIView(APIView):
    def post(self, request, *args, **kwargs):
        evento_serializer = EventoSerializer(data=request.data)
        if evento_serializer.is_valid():
            evento_serializer.save()
            return Response(evento_serializer.data, status=status.HTTP_201_CREATED)
        return Response(evento_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@permission_classes([IsAuthenticated])
class EditarEventoAPIView(APIView):
     def put(self, request, evento_id):
        try:
            evento = Evento.objects.get(pk=evento_id)
        except Evento.DoesNotExist:
            return Response({"error": "Evento no encontrado"}, status=status.HTTP_404_NOT_FOUND)

        # Asegurarse de que el usuario que intenta actualizar el evento sea el propietario
        if evento.idUsuario != request.user:
            return Response({"error": "No tienes permisos para actualizar este evento"}, status=status.HTTP_403_FORBIDDEN)

        evento_serializer = EventoSerializer(evento, data=request.data)
        if evento_serializer.is_valid():
            evento_serializer.save()
            return Response(evento_serializer.data, status=status.HTTP_200_OK)
        return Response(evento_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    

    
