from django.shortcuts import get_object_or_404
from django.db import IntegrityError

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import User, Visitor
from .serializer import UserSerializer, VisitorSerializer


class UserOperations(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if not request.user.is_super_admin:
            return Response(
                {"error": "users can only be created by super admins"},
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except IntegrityError as e:
                return Response(
                    {"error creating a new user": str(e)},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        pk = request.query_params.get("pk")

        try:
            if pk:
                user = get_object_or_404(User, pk=pk)
                serializer = UserSerializer(user)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                users = User.objects.all()
                serializer = UserSerializer(users, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"error fetching user information": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def put(self, request):
        pk = request.query_params.get("pk")

        try:
            if pk:
                user = get_object_or_404(User, pk=pk)
                serializer = UserSerializer(user, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {"error updating user information": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def patch(self, request):
        pk = request.query_params.get("pk")

        try:
            if pk:
                users = get_object_or_404(User, pk=pk)
                serializer = UserSerializer(users, data=request.data, partial=True)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {"error updating partial user information": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def delete(self, request):
        pk = request.query_params.get("pk")

        try:
            if pk:
                user = get_object_or_404(User, pk=pk)
                user.delete()
                return Response(status=status.HTTP_200_OK)
            return Response(status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {"error in deleting user": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class VisitorOperations(APIView):
    def post(self, request):
        if not request.user.is_user:
            return Response(
                {"error": "only authenticated users can create visitors"},
                status=status.HTTP_403_FORBIDDEN,
            )

        data = request.data.copy()
        data["user"] = request.user.id

        serializer = VisitorSerializer(data=data)

        try:
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        except IndexError as e:
            return Response(
                {"error in creating a visitor": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def get(self, request):
        pk = request.query_params.get("pk")
        try:
            if pk:
                visitor = get_object_or_404(Visitor, pk=pk)
                serializer = VisitorSerializer(visitor)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                visitors = Visitor.objects.all()
                serializer = VisitorSerializer(visitors, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"error in fetching visitor information": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def put(self, request):
        pk = request.query_params.get("pk")

        try:
            if pk:
                visitor = get_object_or_404(Visitor, pk=pk)
                serializer = VisitorSerializer(visitor, data=request.data)

                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {"error updating visitor information": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def patch(self, request):
        pk = request.query_params.get("pk")

        try:
            if pk:
                visitor = get_object_or_404(Visitor, pk=pk)
                serializer = VisitorSerializer(visitor, data=request.data, partial=True)

                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {"error updating partial visitor information": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def delete(self, request):
        pk = request.query_params.get("pk")

        try:
            if pk:
                visitor = get_object_or_404(Visitor, pk=pk)
                visitor.delete()
                return Response(status=status.HTTP_200_OK)
            return Response(status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {"error deleting visitor": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
