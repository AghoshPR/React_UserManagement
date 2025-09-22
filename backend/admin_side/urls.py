
from django.contrib import admin
from django.urls import path,include

from .views import *

urlpatterns = [
   
    path('adminLogin/',AdminLoginView.as_view(),name='adminLogin'),
    path('users/',ListUsers.as_view(),name='userList'),

    path('deleteUser/<id>/',DeleteUser.as_view(),name='adminDelete'),
    path('editUser/<id>/',EditUser.as_view(),name='adminEdit'),
    path('createUser/',CreateUser.as_view(),name='adminCreateUser')
]

