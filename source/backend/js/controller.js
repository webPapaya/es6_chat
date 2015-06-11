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
        socket.on('join', function(roomName) {
            let room = rooms.filter(function(room) {
                return room.name === roomName;
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