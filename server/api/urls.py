from django.urls import path
from .views import UserOperations, VisitorOperations
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("token/", TokenObtainPairView.as_view(), name="TokenObtainPair"),
    path("token/refresh", TokenRefreshView.as_view(), name="TokenRefreshView"),
    path("users/", UserOperations.as_view(), name="UserOperations"),
    path("visitors/", VisitorOperations.as_view(), name="VisitorOperations"),
]
