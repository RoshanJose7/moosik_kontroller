from django.urls import path
from .views import GetRoom, JoinRoom, LeaveRoom, RoomView, CreateRoomView, UpdateRoom, UserInRoom

urlpatterns = [
	path('home/', RoomView.as_view()),
	path('room/create/', CreateRoomView.as_view()),
	path('get-room/', GetRoom.as_view()),
	path('join-room/', JoinRoom.as_view()),
	path('user-in-room/', UserInRoom.as_view()),
	path('leave-room/', LeaveRoom.as_view()),
	path('update-room/', UpdateRoom.as_view())
]
