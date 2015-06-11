import mongoose from 'mongoose'
let { Schema } = mongoose;
import Promise from 'promise';
import Room from './room';

let UserSchema = new Schema({
    name: { type: String, default: `User-${Date.now()}` },
    roomId: { type: String }
})
let UserModel = mongoose.model('User', UserSchema)

class User {
    constructor(record) {
        this._record = record
    }

    get id() {
        return this._record.id;
    }

    get name() {
        return this._record.name;
    }

    get room() {
        return Room.find(this._record.id)
    }

    json() {
        return {
            id: this._record.id,
            name: this._record.name
        }
    }

    static initRecords(users) {
        return users.map(function(userRecord) {
            return new User(userRecord)
        })
    }

    static create(name, room) {
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

    static all(cb) {
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

    static findByName(name, cb) {
        return UserModel.find({name: name}, function(err, users) {
            cb(users);
        });
    }

    static findByRoom(room) {
        return new Promise(function(resolve, reject) {
            UserModel.find({roomId: room.id}, function(err, userRecords) {
                if(!err) {
                    let users = User.initRecords(userRecords)
                    resolve(users)
                } else {
                    reject(err);
                }
            })
        });
    }

    static removeAll(cb = function(){}) {
        UserModel.remove({}, cb())
    }
}

export default User;