from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note

#Class based views for listing and creating notes.
class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user) #only fetch notes of the logged in user.
    
    def perform_create(self, serializer):
        #When creating a note, automatically set the author to the logged-in user.
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        #else block to print errors if the serializer is not valid.
        else:
            print(serializer.errors)
            
class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user) #only allow deletion of notes owned by the logged-in user.
        
        
# Create your views here.
class CreateUserView(generics.CreateAPIView):
    #Make sure that user doesn't exist by going through the previous data.
    queryset= User.objects.all()
    #data to be accepted to make a new user.
    serializer_class = UserSerializer
    #allow anyone even if they are not authenticated.
    permission_classes = [AllowAny]