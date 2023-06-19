import './dialog.css'
import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import {callGetDialog, callSendMessage} from "../../api/gigaApi";
import Message from "../message/Message";

function Dialog() {
    const params = useParams()
    const externalId = params.externalId
    const navigate = useNavigate()

    const [dialog, setDialog] = useState({})
    const [reload, setReload] = useState(true)
    const [message, setMessage] = useState(null)

    useEffect(() => {
        if(reload) {
            callGetDialog(externalId)
                .then(result => setDialog(result))
                .catch(() => navigate("/"))
            setReload(false)
        }
    }, [reload])


    useEffect(() => {
        setInterval(function() {
            setReload(true)
        }, 1000)
    }, [])


    function defineClass(message) {
        if(externalId === message.author.externalId) {
            return "another-person-message"
        } else {
            return "current-person-message"
        }
    }

    function sendMessage() {
        let sendMessageRequest = {
            text: message,
            receiverId: externalId
        }

        callSendMessage(sendMessageRequest).then(() => {
            setReload(true)
            document.getElementById("text").value = ""
        })
    }

    return(
        <div className={"dialog"}>
            <div className={"messages-block"}>
                {dialog.messages?.map(item => <div className={defineClass(item)}>
                    <Message message={item}/>
                </div>)}
            </div>
            <div className={"input-block-message"}>
                <textarea rows={5} cols={50} placeholder={"Ваше сообщение"} onChange={e => setMessage(e.currentTarget.value)} id={"text"} className={"text-area"}/>
                <div className={"button-block"}>
                    <button onClick={sendMessage} className={"message-button"}>Отправить</button>
                </div>
            </div>
        </div>
    )
}

export default Dialog