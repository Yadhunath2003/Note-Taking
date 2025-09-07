from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

# Create your views here.
class CreateUserView(generics.CreateAPIView):
    #Make sure that user doesn't exist by going through the previous data.
    queryset= User.objects.all()
    #data to be accepted to make a new user.
    serializer_class = UserSerializer
    #allow anyone even if they are not authenticated.
    permission_classes = [AllowAny]