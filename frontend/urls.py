from django.urls import path
from .views import index

urlpatterns = [
	path('', index),
	path('room/join/', index),
	path('room/create/', index),
	path('room/join/1/', index),
]
