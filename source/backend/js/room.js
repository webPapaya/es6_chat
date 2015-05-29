let rooms = [];

class Room {
    constructor(name) {
        this._name = name
        this._users = [];
    }

    get name() {
        return this._name;
    }

    get users() {
        return this._users;
    }

    json() {
        return {
            name: this.name
        }
    }

    static all() {
        return rooms.map(function(room) {
                return room.json();
            }
        );
    }
}

rooms.push(new Room('Room 1'), new Room('Room 2'), new Room('Room 3'));

export default Room;