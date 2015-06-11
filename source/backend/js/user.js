import Promise from 'promise';
import Room from './room';

class User {
    constructor(id, room, name=undefined) {
        this._id   = id;
        this._room = room;
        this._name = name || `User-${Date.now()}`;
    }

    get id() {
        return this.id;
    }

    get name() {
        return this._name;
    }

    get room() {
        return this._room;
    }

    json() {
        return {
            id:     this.id,
            name:   this.name,
            room:   this.room.name
        }
    }

    static create(name, room, socket) {
        let roomId = room instanceof Room ? room.id : room
        let record = new UserModel({ name: name, roomId: roomId })

        return new Promise(function(resolve, reject) {
            record.save(function(err) {
                if(!err) {
                    return resolve(new User(record));
                } else {
                    return reject(err);
                }
            })
        })
    }

    static all() {
        UserModel.find(function(err, users) {
            users = users.map(function(user) { return new User(user) })
            cb(users, err)
        });
    }

    static allJson(cb) {
        this.all(function(users) {
            let jsonUsers = users.map(function(user) { return user.json() })
            cb(jsonUsers)
        })
    }

    static removeAll(cb = function(){}) {
        UserModel.remove({}, cb())
    }
}

export default User;