from django.shortcuts import render,HttpResponse

from rest_framework.views import APIView
from rest_framework.permissions import AllowAny,IsAdminUser
from rest_framework.response import Response
from django.contrib.auth import authenticate,get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from user.serializers import RegisterSerializer
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
        
        search = request.query_params.get("search","")

        users = User.objects.all()

        if search:
            users = users.filter(username__icontains = search) | users.filter(email__icontains=search)

        data = [ 
            
            { "id":u.id,
            "username":u.username,
            "email":u.email,
            "is_staff":u.is_staff, 
            "is_superuser":u.is_superuser
            }
             
            for u in users]

        return Response(data)

    

class DeleteUser(APIView):

    permission_classes=[IsAdminUser]

    def delete(self,request,id):

        try:

            user = User.objects.get(id=id)
            user.delete()

            return Response({"message":"User Deleted Successfully"})

        except User.DoesNotExist:

            return Response({"error":"user not found"},status=status.HTTP_404_NOT_FOUND)



class EditUser(APIView):

    permission_classes=[IsAdminUser]

    def put(self,request,id):

        try:
            user=User.objects.get(id=id)

            username=request.data.get("username",user.username)
            email=request.data.get("email",user.email)

            if User.objects.filter(username=username).exclude(id=user.id).exists():
                return Response({"username": "Username already exists."}, status=status.HTTP_400_BAD_REQUEST)
        
            if User.objects.filter(email=email).exclude(id=user.id).exists():
                return Response({"email": "Email already exists."}, status=status.HTTP_400_BAD_REQUEST)

            user.username=username
            user.email=email
            user.save()

            return Response({"message": "User updated successfully"})
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        

class CreateUser(APIView):

    permission_classes = [IsAdminUser]

    def post(self,request):
        
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)







       



