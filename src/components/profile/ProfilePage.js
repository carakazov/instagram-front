import SimplePost from "../simplepost/SimplePost";
import {useEffect, useState} from "react";
import {Navigate, useNavigate, useParams} from "react-router";
import {callBlacklist, callGetUser} from "../../api/gigaApi";
import './profilepage.css'
import {getAccessStatus, getExternalId} from "../../helper/credentialsHelper";


function ProfilePage() {
    const params = useParams()
    const externalId = params.externalId
    const navigate = useNavigate()

    const [profile, setProfile] = useState({})
    const [simplePosts, setSimplePosts] = useState([])
    const [reload, setReload] = useState(true)
    const [blacklisted, setBlacklisted] = useState(null)


    useEffect(() => {
        if(reload) {
            callGetUser(externalId)
                .then(result => {
                    if(result.isRequesterBlacklisted) {
                        alert("Вы в черном списке у данного пользователя!")
                        setBlacklisted(true)
                    } else {
                        setBlacklisted(false)
                    }
                    setProfile(result)
                    setSimplePosts(result.simplePosts)
                })
                .catch(() => navigate("/"))
            setReload(false)
        }
    }, [reload])

    let currentUserExternalId = getExternalId()


    let createPostButton
    let goToDialogButton
    let blackListButton


    function blacklist() {
        callBlacklist(externalId).then(() => setReload(true))
    }

    if(externalId === currentUserExternalId) {
        if(getAccessStatus() === "READ_ONLY") {
            createPostButton = <p>Возможность добавлять посты была заблокирована администрацией</p>
        } else {
            createPostButton = <button className={"create-post-button"} onClick={() => navigate("/post/create")}>Добавить пост</button>
        }
        goToDialogButton = null
        blackListButton = null
    } else {
        goToDialogButton =  <button className={"create-post-button"} onClick={() => navigate("/message/" + externalId)}>Написать сообщение</button>
        createPostButton = null
        let text = profile.isUserBlacklistedByRequester ? "Убрать из черного списка" : "Добавить в черный список"
        blackListButton = <button className={"create-post-button"} onClick={blacklist}>{text}</button>
    }

    if(!blacklisted) {
        return(
            <div className={"profile-wrapper"}>
                <div className={"user-info"}>
                    <p className={"full-name"}>{profile.surname} {profile.name} {profile.middleName}</p>
                    <p>{profile.birthdate}</p>
                </div>
                <div className={"buttons"}>
                    {createPostButton}
                    {goToDialogButton}
                    {blackListButton}
                </div>
                <div className={"posts-wall"}>
                    {simplePosts.map(item => <SimplePost externalId={item.externalId} cover={item.cover} postingTime={item.postingTime} key={item.externalId}/>)}
                </div>
            </div>
        )
    } else {
        return <button className={"create-post-button"} onClick={() => {
            setReload(true)
            navigate("/user/" + currentUserExternalId)}
        }>Домой</button>
    }
}

export default ProfilePage