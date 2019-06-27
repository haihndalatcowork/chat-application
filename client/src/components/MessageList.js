import React from 'react';
import Message from "./Message";

class MessageList extends React.Component {
    render() {
        const {list,user} = this.props;
        return (
            list.map((item) => (
                <Message key={item.id} user={user} item={item}/>
            ))
        )
    }
}

MessageList.defaultProps = {
    list: []
};

export default MessageList