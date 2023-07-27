import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ShowCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get(import.meta.env.VITE_URL_KEYR+"/admin/courses", {
      headers: {
        "authorization": "Bearer " + localStorage.getItem("token")
      }
    })
      .then(res => {
        setCourses(res.data.courses);
      })
      .catch(err => {
        console.error("Error fetching courses:", err);
      });
  }, []);
  return(
    <div>
      <h1>Course Page</h1>
      {courses.map((c) => <Course key={c._id} id={c._id} title={c.title} description={c.description} price={c.price} imageLink={c.imageLink} published={c.published} />)}
    </div>
  );
}

function Course(props) {
  const navigate = useNavigate();
  function addContent() {
    navigate("/courses/" + props.id+"/content");
  }
  return (
    <div>
      <h1>{props.title}</h1>
      <p>{props.id}</p>
      <p>{props.description}</p>
      <p>{props.price}</p>
      <p>{props.imageLink}</p>
      <p>{props.published}</p>
      <br />
      <button onClick={addContent}>add Content</button>
    </div>
  );
}

export default ShowCourses;
