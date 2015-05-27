"use strict";

import React      from 'react';
import AppActions from '../actions/app_actions'
import AppStore   from '../stores/app_store'

var ShowComponent = React.createClass({
    render() {
        return(
            <div>
                {AppStore.getChatMessages()}
            </div>
        );
    }
});

export default ShowComponent;