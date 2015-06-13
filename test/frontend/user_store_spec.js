var MockBrowser = require('mock-browser').mocks.MockBrowser;
GLOBAL.Function = function() {
    return function() {
        return MockBrowser.createWindow();
    }
};

var expect     = require("expect.js"),
    userStore  = require("../../tmp/test/frontend/js/stores/user_store"),
    dispatcher = require("../../tmp/test/frontend/js/dispatcher/app_dispatcher");

describe('User Store: ', function() {
    describe('Add a new room', function() {
        it('should allow to create a username', function (done) {
            dispatcher.dispatch({
                actionType: 'changeName',
                payload:    {
                    name: 'hans'
                }
            });
            expect(userStore.getUserName()).to.be('hans');
            done();
        });
    });
});