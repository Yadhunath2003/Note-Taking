from django.contrib.auth.models import User
from rest_framework import serializers

#ORM - Object relational mapping.
#Maps python objects to the corresponding code that needs to be run in the database.
#Serailizer - convert python to json data during requests and response.

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}} #no one is reading the password for security
     
     #Create a new version of the user, first makes sure the data is valid for the user by using the "validated_data" field.   
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
