import hash from './lib/hash';
import 'mongoskin';
import db from './db.js';

let rooms = [];

class Room {
    constructor(name) {
        if(Room.findByName(name).length > 0) {
            throw new Error(`A room called '${name}' already exists.`)
        }

        this._name = name;
        this._default = (Room.all().length === 0);
        this._users = [];
        this._id = hash(name);

        Room._add(this);
    }

    get default() {
        return this._default;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get users() {
        return this._users;
    }

    json() {
        return {
            name: this.name,
            id: this.id
        }
    }

    static all() {
        //let rooms = db.collection('rooms').find().toArray(function(err, result) {
        //    if (err) throw err;
        //    return result;
        //
        //});
        //console.log(rooms);


        return rooms;
    }

    static allJson() {
        return rooms.map(function(room) {
            return room.json();
        });
    }

    static new(name) {
        return new this(name);
    }

    static findByName(name) {
        return this.all().filter(function(room) {
            return room.name === name;
        });
    }

    static _add(room) {
        db.collection
    }

    static default() {
        let defaults = this.all().filter(function(room) {
            return room.default
        })

        return defaults[0]
    }
}

export default Room;