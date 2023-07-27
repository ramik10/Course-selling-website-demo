import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
function AddContent() {
    const { courseId } = useParams();
    function createContent(){
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const videoLink = document.getElementById("videoLink").value;
    axios.post(import.meta.env.VITE_URL_KEYR+"/admin/courses/"+courseId+"/content",{
        title, description, videoLink},{
            headers: {"authorization": "Bearer " + localStorage.getItem("token")}
        }).then((response) => {
            console.log(response.status);
        })
    }
    return <div>
        <h1>Add Content Page</h1>
        <input type={"text"} id="title" placeholder="title"/>
        <input type={"text"} id="description" placeholder="description"/>
        <input type={"text"} id="videoLink" placeholder="videoLink"/>
        <button onClick={createContent}>Create Content</button>
    </div>
    
}
export default AddContent;