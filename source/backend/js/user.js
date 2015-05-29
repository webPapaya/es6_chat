import hash from './lib/hash';
import Room from './room';

let _users = []

class User {
    constructor(name) {
        if(User.findByName(name).length > 0) {
            throw new Error(`A user called '${name}' already exists.`)
        }

        this._name = name;
        this._id = hash(name);

        User._add(this);
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    json() {
        return {
            name: this.name,
            id: this.id
        }
    }

    static new(name) {
        return new this(name);
    }

    static all() {
        return _users
    }

    static findByName(name) {
        return this.all().filter(function(user) {
            return user.name === name;
        });
    }

    static _add(user) {
        _users.push(user);
    }

    static removeAll() {
        _users = [];
    }
}

export default User;