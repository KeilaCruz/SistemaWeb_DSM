from django.urls import path
from gestion_pacientes.api.api import PacienteAPIView, PacienteDetailAPIView, CitaAPIView, getRoutes, NotasAPIView
from rest_framework_simplejwt.views import (
     TokenRefreshView, TokenVerifyView
)
from .api import MyTokenObtainPairView

urlpatterns = [
    path("paciente/", PacienteAPIView.as_view()), 
    path("paciente/<str:CURP>/", PacienteDetailAPIView.as_view()),
    path("cita/", CitaAPIView.as_view()),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("api/token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("", getRoutes),
    path("notas/", NotasAPIView.as_view()),
]
