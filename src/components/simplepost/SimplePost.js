import PhotoCard from "../photocard/PhotoCard";
import './simplepost.css'
import {useNavigate} from "react-router";

function SimplePost(props) {
    const {externalId, cover, postingTime} = props
    const navigate = useNavigate()

    function getFull() {
        navigate("/post/" + externalId)
    }


    return(
        <div className={'simple-post-container'}>
            <PhotoCard photoBase64={cover.photoBase64} externalId={cover.externalId}/>
            {postingTime}
            <button className={"show-full-button"} onClick={getFull}>Показать полностью</button>
        </div>
    )
}

export default SimplePost