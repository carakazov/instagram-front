import "./photocard.css"

function PhotoCard(props) {
    const {photoBase64, externalId} = props

    return(
        <img src={"data:image/png;base64," + photoBase64} className={"photo"}/>
    )
}

export default PhotoCard