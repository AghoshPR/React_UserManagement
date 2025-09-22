from django.shortcuts import render,HttpResponse

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny,IsAuthenticated
from .serializers import *
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate



class RegisterView(APIView):

    permission_classes = [AllowAny]

    def post(self,request):


        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():

            user=serializer.save()
            return Response({"message":"User registered successfully"},status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    

class LoginView(APIView):

    permission_classes=[AllowAny]

    def post(self,request):

        username=request.data.get("uname")
        password = request.data.get("pass")

        user = authenticate(username=username,password=password)

        if user is not None:

            refresh = RefreshToken.for_user(user)
            return Response({
                "refresh":str(refresh),
                "access":str(refresh.access_token),
                "username":user.username,
                "email":user.email
            })
       
        return Response({"error":"invalid Credentials"},status=status.HTTP_401_UNAUTHORIZED)


class UserProfile(APIView):

    permission_classes=[IsAuthenticated]

    def get(self,request):

        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data)
    

    def put(self,request):

        serializer = UserProfileSerializer(request.user,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)