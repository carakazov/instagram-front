import './header.css'
import {getExternalId} from "../../helper/credentialsHelper";
import {useNavigate} from "react-router";
import {logout} from "../../helper/tokenHelper";
import {useContext} from "react";
import {Context} from "../context/context";

function Header() {
    const {isHeaderVisible} = useContext(Context)
    let currentExternalId = getExternalId()
    const navigate = useNavigate()

    return(
        <div className={"header-block"}>
            <button className={"header-button"} onClick={() => navigate("/user/" + currentExternalId)}>Моя страница</button>
            <button className={"header-button"} onClick={() => navigate("/feed")}>Лента</button>
            <button className={"header-button"} onClick={() => navigate("/user/all")}>Все пользователи</button>
            <button className={"header-button"} onClick={() => {
                logout()
                isHeaderVisible(false)
                navigate("/")
            }}>Выйти</button>
        </div>
    )

}

export default Header