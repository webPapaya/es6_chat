var expect = require("expect.js");

var mongoose =  require("mongoose"),
    db =        require("../../tmp/backend/js/config/config").db,
    User =      require("../../tmp/backend/js/user"),
    Room =      require("../../tmp/backend/js/room");

var wipeDbAfterTests = true;

describe('Chat: ', function() {
    var room;

    beforeEach(function(done) {
        mongoose.connect(db.test, function() {
            Room.create('New Room 1').then(function(newRoom) {
                room = newRoom;
                done();
            });
        });
    });

    afterEach(function(done) {
        if(!wipeDbAfterTests) {
            mongoose.connection.close(done);
        } else {
            mongoose.connection.db.dropDatabase(function() {
                mongoose.connection.close(done);
            });
        }
    });

    describe('A new room', function(){
        it('should allow to be created from Room.create', function(done) {
            Room.create('New room').then(function(newRoom) {
                expect(newRoom).to.be.a(Room);
                done()
            })
        })

        it('should have a name', function() {
            expect(room.name).to.be('New Room 1');
        })

        it('should be serializable', function() {
            var json = room.json();
            expect(json.name).to.be('New Room 1');
        })

        describe('that is empty', function() {
            it('should have no users', function() {
                expect(room.users()).to.not.be(undefined);
                expect(room.users().length).to.be(0);
            });
        });

        it('should have a slug', function() {
            expect(room.slug).to.be('/new-room-1');
        });

        describe('where one user joined', function() {
            var user;

            beforeEach(function() {
                user = new User(1234, room);
                room.enter(user);
            });

            it('should have users', function() {
                expect(room.users()).to.not.be(undefined);
            });

            it('should have one user', function() {
                expect(room.users().length).to.be(1);
            });

            describe('and left', function() {
                beforeEach(function() {
                    room.leave(user);
                })
            })
        });
    });

    describe('List of rooms', function() {
        it('should not return database records', function (done) {
            Room.all().then(function(rooms) {
                expect(rooms[0].users).to.not.be(undefined);
                done();
            })
        });

        describe('as json', function() {
            it('should not return raw objects', function (done) {
                Room.allJson().then(function(rooms) {
                    expect(rooms[0]._name).to.be(undefined);
                    expect(rooms[0].name).to.not.be(undefined);
                    done();
                });
            });
        });
    });
});