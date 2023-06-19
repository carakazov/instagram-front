import {useContext, useState} from "react";
import {isEmpty} from "../../validation/stringValidation";
import {callLogin} from "../../api/authApi";
import {setData} from "../../helper/credentialsHelper";
import './loginpage.css'
import jwtDecode from 'jwt-decode'
import {useNavigate} from "react-router";
import {Context} from "../context/context";

function LoginPage() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState({})
    const {isHeaderVisible} = useContext(Context)
    const navigate = useNavigate()

    function validate() {
        let correct = true;
        let validationErrors = {}
        if(isEmpty(login)) {
            validationErrors.login = "Обязательное поле"
            correct = false
        }
        if(isEmpty(password)) {
            validationErrors.password = "Обязательное поле"
            correct = false
        }
        setErrors(validationErrors)
        return correct
    }

     function callForLogin() {
        if(validate()) {
            callLogin({login, password}).then((result) => {
                let token = result.token
                let tokenDecoded = jwtDecode(token)
                let role = tokenDecoded.role
                let externalId = tokenDecoded.externalId
                let accessStatus = tokenDecoded.accessStatus
                isHeaderVisible(true)
                if(accessStatus === 'BLOCKED') {
                    alert("Вы были заблокированы администрацией")
                } else {
                    setData(login, password, role, externalId, accessStatus)
                    if(role === 'ROLE_ADMIN') {
                        navigate("/user/all")
                    } else {
                        navigate("/feed")
                    }
                }
            }).catch(status => {
                if(status === 401) {
                    console.log(status)
                    setErrors({loginError: "Неверные данные"})
                } else {
                    setErrors({loginError: "Ошибка на сервере. Попробуйте позже"})
                }
            })
        }
    }

    const loginLabel = errors.login && <label className={'error-label'}>{errors.login}</label>
    const passwordLabel = errors.password && <label className={'error-label'}>{errors.password}</label>
    const loginError = errors.loginError && <label className={'error-label login-error'}>{errors.loginError}</label>

    return(
        <div className={'login-form'}>
            {loginError}
            <div className={'login-block login-form-item'}>
                <label>Логин:</label>
                <input type={"text"} placeholder={"login"} onChange={e => setLogin(e.currentTarget.value)}/>
                {loginLabel}
            </div>
            <div className={'password-block login-form-item'}>
                <label>Пароль:</label>
                <input type={"password"} placeholder={"password"} onChange={e => setPassword(e.currentTarget.value)}/>
                {passwordLabel}
            </div>
            <div className={'password-block login-form-item'}>
                <button onClick={callForLogin}>Вход</button>
                <button onClick={() => navigate("/register")}>Регистрация</button>
            </div>
        </div>
    )
}

export default LoginPage