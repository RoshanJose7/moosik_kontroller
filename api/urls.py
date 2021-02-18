from api.models import Room
from django.urls import path
from .views import GetRoom, RoomView, CreateRoomView

urlpatterns = [
	path('home/', RoomView.as_view()),
	path('room/create/', CreateRoomView.as_view()),
	path('get-room/', GetRoom.as_view())
]
