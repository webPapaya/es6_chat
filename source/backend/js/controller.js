import Room from './room'
import User from './user'

class Controller {
    roomsIndex (_, res) {
        Room.allJson().then(function(rooms) {
                res.json(rooms)
            })
    }

    roomUsers (req, res) {
        let id = req.params.id;
        Room.find(id).then(function(room) {
            room.users().then(function(users) {
                res.json(users);
            });
        })
    }

    usersIndex (_, res) {
        User.allJson(users => {
                res.json(users)
            }
        )
    }

    idleSocket (socket) {
        socket.emit('connection');
        socket.on('addChatRoom', function(roomName) {
            Room.create(roomName).then(
                function success (response) {
                    socket.emit('addedChatRoom', roomName);
                },
                function error(error) {
                    socket.emit('addChatRoomFailed', error);
                }
            );
        });

        socket.on('getAllRooms', function() {
            Room.allJson().then(
                function success(rooms) {
                    socket.emit('getAllRooms', rooms);
                },
                function error(error) {
                    socket.emit('error', 'An error occured while getting Rooms');
                }
            );
        });

        socket.on('join', function(r) {
            let room = rooms.filter(function(room) {
                return (room.name === r) || (room.id === r);
            });

            if(room) {
                room.connect(socket);
            } else {
                socket.emit('error', `Room ${roomName} doesn't exist!`);
            }
        });
    }
}

export default Controller