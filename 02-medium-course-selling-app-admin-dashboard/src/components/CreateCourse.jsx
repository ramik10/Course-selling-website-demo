import React from "react";
import axios from "axios";
/// You need to add input boxes to take input for users to create a course.
/// I've added one input so you understand the api to do it.
function CreateCourse() {
    function createCourse(){
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const publishValue = document.getElementById("published").value
    const imageLink = document.getElementById("imageLink").value;
    const published = publishValue === "true" ? true : false;
    axios.post(import.meta.env.VITE_URL_KEYR+"/admin/courses",
        {title, description, price, published, imageLink},{
        headers: {"authorization": "Bearer " + localStorage.getItem("token")}
    }).then((response) => {
        console.log(response.status)
    })}
    return <div>
        <h1>Create Course Page</h1>
        <input type={"text"} id="title" placeholder="title"/>
        <input type={"text"} id="description" placeholder="description"/>
        <input type={"text"} id="price" placeholder="price"/>
        <input type={"text"} id="published" placeholder="published"/>
        <input type="text" id="imageLink" placeholder="imageLink"/>
        <button onClick={createCourse}>Create Course</button>
    </div>
}
export default CreateCourse;