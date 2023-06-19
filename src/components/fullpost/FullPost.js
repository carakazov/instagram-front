import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import {callGetPost, callLike} from "../../api/gigaApi";
import PhotosRoulette from "../photosrullete/PhotosRoullete";
import './fullpost.css'

function FullPost() {
    const params = useParams()
    const externalId = params.externalId
    const navigate = useNavigate()

    const [post, setPost] = useState({})
    const [photos, setPhotos] = useState([])
    const [author, setAuthor] = useState({})
    const [liked, setLiked] = useState(false)

    useEffect(() => {
        callGetPost(externalId)
            .then(result => {
                setPost(result)
                setPhotos(result.photosBase64)
                setAuthor(result.author)
            })
            .catch(() => navigate("/"))
    }, [liked])

    function like() {
        callLike(externalId).then(() => setLiked(true))
    }

    let likeButton

    if(!post.likedByRequester) {
        likeButton = <button onClick={like} className={"like-button"}>Лайк</button>
    } else {
        likeButton = null
    }

    return(
        <div className={"full-post"}>
            <PhotosRoulette photos={photos}/>
            <div className={"author-info"}>
                <b onClick={() => navigate("/user/" + author.externalId)} className={"author-link"}>{author.name}:</b> <b>{post.caption}</b>
                <p>{post.postingTime}</p>
            </div>
            <div className={"likes"}>
                {likeButton}
                Лайков - {post.likes}
            </div>
        </div>
    )
}

export default FullPost