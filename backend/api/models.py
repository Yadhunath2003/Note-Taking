from django.db import models
from django.contrib.auth.models import User

#Declaring a Note model to store notes.
class Note(models.Model):
    #title with a max of 100 characters.
    title = models.CharField(max_length=100)
    #content filed
    content = models.TextField()
    #timestamps for created and updated notes.
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # Each note is linked to a user (author).
    # If the user is deleted, their notes are also deleted (cascade delete).
    # related_name='note' allows accessing a user's notes via user.note.all()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='note')

    def __str__(self):
        return self.title