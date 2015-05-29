"use strict";

import React  from 'react';
import Router from 'react-router';
import ChatWindow from './components/chat_window';
import ChatRooms  from './components/chat_rooms';
import Navigation from './components/navigation';

var { Route, RouteHandler, Link } = Router;
var routes = (
    <Route handler={Navigation}>
        <Route
            name="chatWindow"
            handler={ChatWindow}
            path="chat/"
        />
        <Route
            name="chatRooms"
            handler={ChatRooms}
            path="/"
        />
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('content'));
});