from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from gestion_pacientes.models import Evento
from .serializers import EventoSerializer
from django.shortcuts import get_object_or_404


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
    def get(self, request, idEvento, format=None):
        evento = get_object_or_404(Evento, idEvento=idEvento)
        evento_serializer = EventoSerializer(evento)
        return Response(evento_serializer.data)
    
    def put(self, request, idEvento, format=None):
        evento = get_object_or_404(Evento, idEvento=idEvento)
        evento_serializer = EventoSerializer(evento, data=request.data)
        if evento_serializer.is_valid():
            evento_serializer.save()
            return Response(evento_serializer.data)
        return Response(evento_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_examenMedico(self, idEvento):
        try:
            return Evento.objects.get(idEvento=idEvento)
        except Evento.DoesNotExist:
            raise "No existe"
    
    

    
