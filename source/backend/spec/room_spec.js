import assert from "assert";
import expect from "expect.js";
import Room from "../js/room";

describe('A new room', function(){
    let room = new Room('Room 1');

    it('should have a name', function() {
        expect(room.name).to.be('Room 1');
    });

    it('should be serializable', function() {
        let json = room.json();
        expect(json.name).to.be('Room 1');
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
});

describe('List of rooms', function() {
  it('should contain 3 rooms', function() {
     expect(Room.all().length).to.be(3);
  });

    it('should not return raw objects', function () {
        expect(Room.all()[0]._name).to.be(undefined);
    });
})
