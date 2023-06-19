import {useState} from "react";
import "./registration.css"
import {callRegister} from "../../api/gigaApi";
import {isEmpty} from "../../validation/stringValidation";
import {useNavigate} from "react-router";

function Registration() {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [middleName, setMiddleName] = useState("")
    const [birthdate, setBirthdate] = useState(null)
    const navigate = useNavigate()

    function register() {
        let validationFailed = false

        if(isEmpty(login)) {
            alert("Укажите логин")
            return
        }

        if(isEmpty(password)) {
            alert("Укажите пароль")
            return
        }

        if(isEmpty(name)) {
            alert("Укажите имя")
            return
        }

        if(isEmpty(surname)) {
            alert("Укажите фамилию")
            return
        }

        if(isEmpty(birthdate)) {
            alert("Укажите дату рождения")
            return
        }

        let registerRequest = {
            login,
            password,
            name,
            surname,
            middleName,
            birthdate
        }
        callRegister(registerRequest)
            .then(result => {
                navigate("/user/" + result)
            })
            .catch(reject => {
            if(reject === "WRONG_LOGIN") {
                alert("Такой логин уже используется")
            } else {
                alert("На сервере произощла ошибка. Попробуйте позже.")
            }
        })
    }

    return(
        <div className={"registration-form"}>
            <input placeholder={"login"} type={"text"} onChange={e => setLogin(e.currentTarget.value)} required={true} className={"registration-input"}/>
            <input placeholder={"password"} type={"password"} onChange={e => setPassword(e.currentTarget.value)} required={true} className={"registration-input"}/>
            <input placeholder={"Иван"} type={"text"} onChange={e => setName(e.currentTarget.value)} required={true} className={"registration-input"}/>
            <input placeholder={"Иванов"} type={"text"} onChange={e => setSurname(e.currentTarget.value)} required={true} className={"registration-input"}/>
            <input placeholder={"Иванович"} type={"text"} onChange={e => setMiddleName(e.currentTarget.value)} className={"registration-input"}/>
            <input type={"date"} onChange={e => setBirthdate(e.currentTarget.value)} required={true} className={"registration-input"}/>
            <button type={"submit"} onClick={register} className={"register-button"}>OK</button>
        </div>
    )
}

export default Registration