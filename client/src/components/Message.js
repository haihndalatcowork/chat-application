import React from 'react';

const Message = (props) => {
    const {item, user} = props;
    return (
        <div className="Message-item">
            {
                user.id === item.user.id ?
                    <div className="My-message">
                        <div className="My-message Message-content">
                            {item.msg}
                        </div>
                    </div>
                    :
                    <div className="Message-content">
                        <b className="user">{item.user.name}</b> {item.msg}
                    </div>
            }
        </div>
    );
};
export default Message