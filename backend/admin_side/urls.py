
from django.contrib import admin
from django.urls import path,include

from .views import *

urlpatterns = [
   
    path('adminLogin/',AdminLoginView.as_view(),name='adminLogin'),
    path('users/',ListUsers.as_view(),name='userList')
]

