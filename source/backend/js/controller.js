import Room from './room'
import User from './user'

class Controller {
    constructor(rooms) {
        this._rooms = rooms;
    }

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

    newConnection (socket) {
        User.create()
    }
}

export default Controller