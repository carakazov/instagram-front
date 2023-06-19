import {useState} from "react";
import {callPost} from "../../api/gigaApi";
import {isEmpty} from "../../validation/stringValidation";
import './createpost.css'
import {getAccessStatus} from "../../helper/credentialsHelper";

function CreatePost() {
    const [files, setFiles] = useState([])
    const [fileNames, setFilesNames] = useState([])
    const [caption, setCaption] = useState(null)
    
    function addFile(e) {
        let file = e.currentTarget.files[0]
        let fullFileName = e.currentTarget.value

        let parts = fullFileName.split("\\")
        let fileName = parts.at(parts.length - 1)

        let fileNameSplit = fileName.split(".")
        let resolution = fileNameSplit.at(fileNameSplit.length - 1)

        if(resolution !== "png" && resolution !== "jpg" && resolution !== "jpeg") {
            alert("Загружать можно только картинки")
            return
        }
        let buffer = files.slice()
        buffer.push(file)
        setFiles(buffer)

        let namesBuffer = fileNames.slice()
        namesBuffer.push(fileName)
        setFilesNames(namesBuffer)
    }

    function send(e) {
        if(isEmpty(caption)) {
            alert("Вы не добавили файл")
            return
        }
        if(files.length === 0) {
            alert("Вы не ввели описание")
            return
        }
        callPost(caption, files).catch(result => alert(result))
        e.preventDefault()
    }

    return(
        <div className={"container"}>
            <div className={"create-post-form"}>
                <label className={"create-post-header"}>Напишите, что вы думаете</label>
                <div>
                    <textarea rows={10} cols={49} required={true} onChange={e => setCaption(e.currentTarget.value)}/>
                </div>
                <div className={"file-input-block"}>
                    <input type={"file"} multiple={true} onChange={e => addFile(e)} required={true}/>
                    <div>
                        Загруженные файлы:
                        {fileNames.map(item => <p>{item}</p>)}
                    </div>
                </div>
                <div>
                    <button type={"submit"} onClick={e => send(e)} className={"input-button"}>OK</button>
                </div>
            </div>
        </div>
    )
}

export default CreatePost