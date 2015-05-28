"use strict";

import React      from 'react';
import ChatButton from './chat_input';

class ChatInput extends React.Component {
    _submit () {

    }
    render() {
        return <div>
            Chat Input
            <ChatButton />
        </div>;
    }
}

export default ChatInput;
