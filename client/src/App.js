import React from 'react';
import './App.css';
import Welcome from "./components/Welcome"
import uuid from "uuid";
import Conversation from "./components/Conversation";

class App extends React.Component {

    state = {
        user: {}
    };

    onCallBack = (name) => {
        let user = {
            name: name,
            id: uuid()
        };
        this.setState({user});
    };

    render() {
        const {user} = this.state;
        return (
            <div className="App">
                {
                    user.id ? <Conversation user={user}/> : <Welcome onCallBack={(user) => this.onCallBack(user)}/>
                }
            </div>
        );
    }
}

export default App;
