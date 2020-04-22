from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response

from .serializers import CustomUSerSerializer, PublicCustomUserSerializer
from .models import CustomUser

from logging import critical as log


class CustomUserCreate(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format='json'):
        serializer = CustomUSerSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PublicCustomUserGet(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, user_id, format=None):
        user = get_object_or_404(CustomUser, pk=user_id)
        log(user)
        serializer = PublicCustomUserSerializer(user)
        log(serializer)
        return Response(serializer.data)



