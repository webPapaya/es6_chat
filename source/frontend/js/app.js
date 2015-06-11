"use strict";

import React      from 'react';
import Router     from 'react-router';
import ChatWindow from './components/chat_window';
import ChatRooms  from './components/chat_rooms';
import Navigation from './components/navigation';
import Home       from './components/chat_home';

var { Route, RouteHandler, Link } = Router;
var routes = (
    <Route handler={Navigation}>
        <Route
            name="home"
            handler={Home}
            path="/"
        />

        <Route
            name="chatWindow"
            handler={ChatWindow}
            path="chat/"
        />

        <Route
            name="chatRoom"
            handler={ChatWindow}
            path="chat/:id"
        />
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('content'));
});