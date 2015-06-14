import React     from 'react';
import Router    from 'react-router';
import UserStore from '../stores/user_store'

var { Route, RouteHandler, Link } = Router;

class Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            links: {
                'home':       'Home'
                //'chatWindow': 'Chat'
            },
            username: UserStore.getUserName()
        };
    }

    componentDidMount() {
        UserStore.addChangeListener(this._nameChanged.bind(this));
    }

    componentWillUnmount() {
        UserStore.removeChangeListener();
    }

    _nameChanged() {
        this.setState({username: UserStore.getUserName()})
    }

    getLinks() {
        let links = [];
        for(let key in this.state.links) {
            links.push(
                <li className="navigation--li">
                    <Link
                        to={key}
                        className="navigation--link"
                    >
                        {this.state.links[key]}
                    </Link>
                </li>
            );
        }
        return links;
    }

    render () {
        return (
            <div>
                <div className="header--wrp">
                    <ol className="navigation--wrp">
                        {this.getLinks.call(this)}
                        <li>
                            hallo
                            Username: {this.state.username}
                        </li>
                    </ol>
                </div>
                <RouteHandler/>
            </div>
        );
    }
}

export default Component;

