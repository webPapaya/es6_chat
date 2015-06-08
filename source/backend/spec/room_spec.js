import assert from "assert";
import expect from "expect.js";
import Room from "../js/room";

describe('A new room', function(){
    let room = new Room('New Room 1');

    it('should allow to be created from Room.new', function() {
        expect(Room.new('New room')).to.be.a(Room);
    })

    it('should have a unique ID', function() {
        expect(room.id).to.not.be(undefined);

        let secondRoom = new Room('New Room 2');
        expect(room.id).to.not.be(secondRoom.id);
    });

    it('should have a name', function() {
        expect(room.name).to.be('New Room 1');
    });

    it('should be serializable', function() {
        let json = room.json();
        expect(json.name).to.be('New Room 1');
    })

    describe('that is empty', function() {
        it('should have no users', function() {
            expect(room.users).to.not.be(undefined);
            expect(room.users.length).to.be(0);
        });
    });

    describe('where one user joined', function() {
       it('should have one user', function() {
       });
    });

    describe('with a name that already exists', function() {
        it('should throw on initialization', function() {
            expect(()=> Room.new('Room 1')).to.throwError();
        })
    })
});

describe('First initialized room', function() {
    let defaultRoom = Room.findByName("Room 1")[0]

    it('should be returned as default', function() {
        expect(Room.default()).to.be(defaultRoom);
    })
});

describe('List of rooms', function() {
  it('should contain 3 rooms', function() {
     expect(Room.all().length).to.be(3);
  });

    it('should return raw objects', function () {
        expect(Room.all()[0]._name).to.not.be(undefined);
    });

    describe('as json', function() {
        it('should not return raw objects', function () {
            expect(Room.allJson()[0]._name).to.be(undefined);
            expect(Room.allJson()[0].name).to.not.be(undefined);
        });
    })

    it('should allow filtering by name', function() {
        expect(Room.findByName('Room 2').length).to.be(1);
    });
})
