from django.contrib.auth import get_user_model
from .models import *
from rest_framework import serializers

from django.contrib.auth.password_validation import validate_password


User = get_user_model()



class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True,required=True,validators=[validate_password])
    password2 = serializers.CharField(write_only=True,required=True)

    class Meta:

        model = User
        fields = ("username","email","password","password2")

    def validate(self,attrs):

        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password":"Passwords didn't match."})
        
        if User.objects.filter(username=attrs['username']).exists():
            raise serializers.ValidationError({"username":"Username already exists."})
        
        if User.objects.filter(email=attrs['email']).exists():
            raise serializers.ValidationError({"email":"Email already exists."})


        return attrs
    
    def create(self,validated_data):

        validated_data.pop('password2')
        password=validated_data.pop('password')
        user=User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model=User
        fields=['id','username','email','phone','profile_image','is_staff','is_superuser']
        
        

        

