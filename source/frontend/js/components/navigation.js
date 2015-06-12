import React     from 'react';
import Router    from 'react-router';
import Radium    from 'radium';
import colors    from '../styles/colors';
import UserStore from '../stores/user_store'

var { Route, RouteHandler, Link } = Router;

let styles = {
    navigation: {
        borderBottom: `1px solid ${colors.lightGray}`,
        listStyle:    'none',
        margin:        0,
        padding:       0
    },
    navItem:  {
        //'flex-grow':     1
    },
    navLink: {
        padding:      20,
        textDecoration: 'none'
    }
};


@Radium
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
                <li style={styles.navItem}>
                    <Link
                        to={key}
                        style={styles.navLink}
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
                <ol style={styles.navigation}>
                    {this.getLinks.call(this)}
                    <li>
                        Username: {this.state.username}
                    </li>
                </ol>
                <RouteHandler/>
            </div>
        );
    }
}

export default Component;

