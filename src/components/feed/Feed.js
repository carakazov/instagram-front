import './feed.css'
import {useEffect, useState} from "react";
import {callGetFeed} from "../../api/gigaApi";
import {useNavigate} from "react-router";
import SimplePost from "../simplepost/SimplePost";

function Feed() {
    const [feed, setFeed] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        callGetFeed()
            .then(result => setFeed(result))
            .catch(() => navigate("/"))
    }, [])

    return(
        <div className={"feed-container"}>
            <div className={"feed-header"}>
                <label className={"feed-header-label"}>Самые свежие публикации</label>
            </div>
            <div className={"feed"}>
                {feed.feed?.map(item => <SimplePost externalId={item.externalId} cover={item.cover} postingTime={item.postingTime}/>)}
            </div>
        </div>
    )
}

export default Feed