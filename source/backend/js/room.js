import hash from './lib/hash';

let rooms = [];

class Room {
    constructor(name) {
        if(Room.findByName(name).length > 0) {
            throw new Error(`A room called '${name}' already exists.`)
        }

        this._name = name;
        this._users = [];
        this._id = hash(name);

        Room._add(this);
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
        rooms.push[room];
    }
}

rooms.push(new Room('Room 1'), new Room('Room 2'), new Room('Room 3'));

export default Room;