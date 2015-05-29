import React  from 'react';
import Router from 'react-router';

var { Route, RouteHandler, Link } = Router;

class Component extends React.Component {
    render () {
        return (
            <div>
                <ol>
                    <li><Link to="chatWindow">Chat</Link></li>
                    <li><Link to="chatRooms">Rooms</Link></li>
                </ol>
                <RouteHandler/>
            </div>
        );
    }
}

export default Component;

