import React from 'react';
import io from 'socket.io-client'
import uuid from 'uuid';
import MessageList from "../components/MessageList";

const socket = io('http://localhost:5000');

class Conversation extends React.Component {
    state = {
        messages: [],
        inputMsg: "",
        inputUsername: "",
        activities: []
    };

    componentWillMount() {
        socket.on('connect', () => {

        });
        socket.emit("user connected", this.props.user);
        socket.on("update user connected", (user) => {
            let msg = `${user.name} has joined the chat!`;
            const activity = {
                id: uuid(),
                msg
            };
            this.setState(prevState => {
                let newActivities = prevState.activities;
                newActivities.push(activity);
                return {
                    activities: newActivities
                }
            })
        });
        socket.on('send message to client', (message) => {
            if (message.user.id !== this.props.user.id) {
                this.setState((prevState) => {
                    let newMessages = prevState.messages;
                    newMessages.push(message);
                    return {
                        messages: newMessages
                    }
                })
            }
        });
    }

    onChangeHandle = (value) => {
        this.setState(value);
    };
    onHandleSubmit = () => {
        this.setState((prevState) => {
            let newMessages = prevState.messages;
            let message = {
                id: uuid(),
                user: this.props.user,
                msg: prevState.inputMsg
            };
            socket.emit('send message', message);
            newMessages.push(message);
            return {
                messages: newMessages,
                inputMsg: ""
            }
        })
    };

    onKeyDownHandle = (key) => {
        if (key === "Enter") this.onHandleSubmit();
    };

    render() {
        const {messages, inputMsg, activities} = this.state;
        const {user} = this.props;
        return (
            <div style={{minWidth: "60%"}}>
                <h1 className="App-name">Chat Application</h1>
                <h3 className="User-name">Hello {user.name}!</h3>
                <div className="App-container">
                    <div className="Activities">
                        <ul>
                            {
                                activities.map(activity => {
                                    return <li key={activity.id}>{activity.msg}</li>
                                })
                            }
                        </ul>
                    </div>
                    <div className="Conversation">
                        <div className="Message-container">
                            <MessageList user={user} list={messages}/>
                        </div>
                        <div className="Input-message">
                            <input type="text" value={inputMsg} placeholder={"Type message here..."}
                                   onChange={(e) => this.onChangeHandle({inputMsg: e.target.value})}
                                   onKeyDown={e => this.onKeyDownHandle(e.key)}/>
                            <button onClick={this.onHandleSubmit}>send</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Conversation;
