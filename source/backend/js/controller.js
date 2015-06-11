import Room from './room'
import User from './user'

class Controller {
    roomsIndex (_, res) {
        Room.allJson().then(function(rooms) {
                res.json(rooms)
            })
    }

    roomUsers (req, res) {
        Room.find(id)
            .then(function(room) {
                return room.users();
            })
            .then(function(users) {
                let jsonUsers = users.map(function(user) {
                    return user.json()
                })
                res.json(jsonUsers)
            });
    }

    usersIndex (_, res) {
        User.allJson(users => {
                res.json(users)
            }
        )
    }
}

export default Controller