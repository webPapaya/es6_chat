var MockBrowser   = require('mock-browser').mocks.MockBrowser;
var browserWindow = MockBrowser.createWindow();

GLOBAL.Function = function() {
    return function() {
        return browserWindow;
    }
};

var expect     = require("expect.js"),
    roomStore  = require("../../tmp/test/frontend/js/stores/room_store"),
    dispatcher = require("../../tmp/test/frontend/js/dispatcher/app_dispatcher");

describe('Room Store: ', function() {
    describe('Room', function() {
        beforeEach(function(done) {
            dispatcher.dispatch({
                actionType: 'addChatRoom',
                payload:    {
                    date:  new Date(),
                    name:  'hallo',
                    id:    1
                }
            });
            done();
        });

        it('should allow to create a new room with the name hallo', function (done) {
            expect(roomStore.getRooms()[0].name).to.be('hallo');
            expect(roomStore.getRooms().length).to.be(1);
            done();
        });
    });
});