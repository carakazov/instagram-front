import {useState} from "react";
import PhotoCard from "../photocard/PhotoCard";
import "./photosroulette.css"


function PhotosRoulette(props) {
    const {photos} = props
    const [currentPhoto, setCurrentPhoto] = useState(0)

    function next() {
        if(currentPhoto < photos.length - 1) {
            let buffer = currentPhoto + 1
            setCurrentPhoto(buffer)
        } else {
            setCurrentPhoto(0)
        }
    }

    function previous() {
        if(currentPhoto === 0) {
            setCurrentPhoto(photos.length - 1)
        } else {
            let buffer = currentPhoto - 1
            setCurrentPhoto(buffer)
        }
    }

    return(
        <div className={"photo-roulette"}>
            <div className={"button-container"}>
                <button onClick={previous} className={"roulette-button"}>Предыдущее фото</button>
            </div>
            <div>
                <PhotoCard photoBase64={photos.at(currentPhoto)?.photoBase64} externalId={photos.at(currentPhoto)?.externalId}/>
            </div>
            <div className={"button-container"}>
                <button onClick={next} className={"roulette-button"}>Следующее фото</button>
            </div>
        </div>
    )
}

export default PhotosRoulette