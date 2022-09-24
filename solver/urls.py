from django.urls import path
from .views import Solver

urlpatterns = [
    path('', Solver.as_view(), name = 'solver view'),
]