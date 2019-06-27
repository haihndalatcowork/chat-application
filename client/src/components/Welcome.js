import React from "react"

class Welcome extends React.Component {
    state = {
        username: ""
    };
    onHandleChange = (value) => {
        this.setState(value)
    };
    onClickHandle = () => {
        if(this.state.username) this.props.onCallBack(this.state.username);
    };

    render() {
        return (
            <div className={"welcome"}>
                <h1>Enter your name to join</h1>
                <div>
                    <input type="text" onChange={(e) => this.onHandleChange({username: e.target.value})}/>
                    <button onClick={this.onClickHandle}>Join</button>
                </div>
            </div>
        )
    }
}

export default Welcome