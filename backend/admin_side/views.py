from django.shortcuts import render,HttpResponse

from rest_framework.views import APIView
from rest_framework.permissions import AllowAny,IsAdminUser
from rest_framework.response import Response
from django.contrib.auth import authenticate,get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
# Create your views here.

User = get_user_model()
class AdminLoginView(APIView):

    permission_classes = [AllowAny]

    def post(self,request):

        adminUsername = request.data.get("adminName")
        adminPassword = request.data.get("adminPass")

        myAdmin = authenticate(username=adminUsername,password=adminPassword)

        if myAdmin is not None and myAdmin.is_staff:

            refresh = RefreshToken.for_user(myAdmin)
            return Response({
                "refresh":str(refresh),
                "access":str(refresh.access_token),
                "username":myAdmin.username,
                "email":myAdmin.email


            })
        return Response({"error":"Invalid Admin Credentials"},status=status.HTTP_401_UNAUTHORIZED)
    


class ListUsers(APIView):

    permission_classes = [IsAdminUser]

    def get(self,request):

        users = User.objects.all()

        data = [ { "id":u.id, "username":u.username, "email":u.email } for u in users]

        return Response(data)



