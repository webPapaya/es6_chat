import assert from "assert";
import expect from "expect.js";
import User from "../js/user";

describe('A new user', function(){

    afterEach(function() {
        User.removeAll();
    });

    it('should allow to be created from User.new', function() {
        expect(User.new('Thomas')).to.be.a(User);
    })

    it('should have a unique ID', function() {
        let user = new User('Alex');
        expect(user.id).to.not.be(undefined);

        let secondUser = new User('Thomas');
        expect(user.id).to.not.be(secondUser.id);
    });

    it('should have a name', function() {
        let user = new User('Alex');
        expect(user.name).to.be('Alex');
    });

    it('should not be able to have an existing name', function() {
        User.new("Alex");

        expect(function() {
            User.new("Alex");
        }).to.throwError();
    })
});