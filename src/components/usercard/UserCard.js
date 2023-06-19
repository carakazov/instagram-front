import './usercard.css'
import {getRole} from "../../helper/credentialsHelper";
import {callChangeStatus} from "../../api/gigaApi";
import {useNavigate} from "react-router";

function UserCard(props) {
    const {user, reload} = props
    const navigate = useNavigate()
    const role = getRole()

    let access;
    let buttonsBlock

    let setFullButton = <button className={"change-button"} onClick={() => changeStatus("FULL")}>Полный доступ</button>
    let setReadOnlyButton = <button className={"change-button"} onClick={() => changeStatus("READ_ONLY")}>Только чтение</button>
    let setBlockedButton = <button className={"change-button"} onClick={() => changeStatus("BLOCKED")}>Заблокировать</button>

    if(role === "ROLE_ADMIN") {
        access = <b>{user.access}</b>
        buttonsBlock =
        <div className={"buttons"}>
            {setFullButton} {setReadOnlyButton} {setBlockedButton}
        </div>
    } else {
        access = null
        buttonsBlock = null
    }


    if(user.access === "FULL") {
        setFullButton = null
    }

    if(user.access === "READ_ONLY") {
        setReadOnlyButton = null
    }

    if(user.access === "BLOCKED") {
        setBlockedButton = null
    }

    function changeStatus(status) {
        callChangeStatus(user.externalId, status)
            .then(() => reload(true))
            .catch(() => navigate("/"))
    }


    return(
        <div className={'user-card'}>
            <p className={"username"} onClick={() => navigate("/user/" + user.externalId)}>{user.surname} {user.name} {user.surname} {access}</p>
            {buttonsBlock}
        </div>
    )
}

export default UserCard