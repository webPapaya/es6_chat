import assert from "assert";
import expect from "expect.js";
import User from "../js/user";

describe('A new user', function(){
    let user = new User('Alex');

    afterEach(function() {
        User.removeAll();
    });

    it('should allow to be created from User.new', function() {
        expect(User.new('Thomas')).to.be.a(User);
    })

    it('should have a unique ID', function() {
        expect(user.id).to.not.be(undefined);

        let secondUser = new User('Thomas');
        expect(user.id).to.not.be(secondUser.id);
    });

    it('should have a name', function() {
        expect(user.name).to.be('Alex');
    });

    it('should not be able to have an existing name', function() {
        expect(()=> {
            User.new("Alex");
        }).to.throwError();
    })
});