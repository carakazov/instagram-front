import './userlist.css'
import {useEffect, useState} from "react";
import {callGetAllUsers} from "../../api/gigaApi";
import {useNavigate} from "react-router";
import UserCard from "../usercard/UserCard";

function UserList() {
    const [users, setUsers] = useState([])
    const [reload, setReload] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        if(reload) {
            callGetAllUsers()
                .then(result => {
                    setUsers(result.users)
                })
                .catch(() => navigate("/"))
            setReload(false)
        }
    }, [reload])

    return(
        <div className={'all-users-list'}>
            {users?.map(item => <UserCard user={item} reload={setReload}/>)}
        </div>
    )
}

export default UserList