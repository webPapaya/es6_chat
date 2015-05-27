"use strict";

import React         from 'react';
import AppActions    from '../actions/app_actions'
import AppStore      from '../stores/app_store'
import ShowComponent from './show_component.react.js'

var Button = React.createClass({
   getInitialState: function() {
     return {
         clicks: 0
     };
   },
    _handleClick() {
        this.setState({clicks: (this.state.clicks + 1)});
        AppActions.create(this.state.clicks);
    },
    render() {
        return(
            <div>
                <ShowComponent />
                <button
                    onClick={this._handleClick}
                >
                    Click me
                </button>
            </div>
        );
    }
});

export default Button;