import React      from 'react';
import ChatInput  from './chat_input';
import ChatThread from './chat_thread';
import ChatStore  from '../stores/chat_store';

class ChatWindow extends React.Component {
    render() {
        return(
            <div>
                <ChatInput />
                <ChatThread />
            </div>
        );
    }
}

export default ChatWindow;
