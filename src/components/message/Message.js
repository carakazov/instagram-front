import './message.css'

function Message(props) {
    const {message} = props


    return(
        <div className={"message-container"}>
            <b className={"author-name"}>{message.author.name}:</b>{message.text}
            <p>{message.sendingTime}</p>
        </div>
    )
}

export default Message