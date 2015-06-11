var expect = require("expect.js");

var mongoose =  require("mongoose"),
    db =        require("../../tmp/backend/js/config/config").db,
    User =      require("../../tmp/backend/js/user");

var wipeDbAfterTests = true;

describe('User', function(){
    var user;

    beforeEach(function(done) {
        mongoose.connect(db.test, function() {
            User.create('Thomas').then(function(newUser) {
                user = newUser;
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

    it('should allow to be created from User.create', function() {
        expect(user).to.be.a(User);
    });

    it('should have a unique ID', function(done) {
        expect(user.id).to.not.be(undefined);

        User.create('Thomas').then(function(secondUser) {
            expect(user.id).to.not.be(secondUser.id);
            done();
        });
    });

    it('should have a name', function() {
        expect(user.name).to.be('Thomas');
    });
});