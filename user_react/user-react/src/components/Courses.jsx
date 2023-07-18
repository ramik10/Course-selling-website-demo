import React from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, CardActions, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


function Courses() {
  const [courses, setCourses] = React.useState([]);

  React.useEffect(() => {
    axios.get(import.meta.env.VITE_URL_KEYR+"/users/courses", {
      headers: {
        "authorization": "Bearer " + localStorage.getItem("token")
      }
    })
      .then(res => {
        // console.log(res.data)
        setCourses(res.data);
      })
      .catch(err => {
        console.error("Error fetching courses:", err);
      });
  }, []);
  return(
      <div>
        <h1 style={{display:"flex", justifyContent:"center"}}>Course Page</h1>
        <Grid container spacing={2} style={{paddingTop:20, justifyContent:"center"}}>
        {courses.map((c) =>
          <Course key={c._id} id={c._id} title={c.title} description={c.description} price={c.price} imageLink={c.imageLink} published={c.published} />)}
        </Grid>
      </div>
  );
}

function Course(props) {
  const navigate = useNavigate();
  const expand = () => {
    navigate("/courses/" + props.id);
  }
  return (
    <Card style={{width:350,marginTop:5, marginLeft:5}}>
      <img src={props.imageLink} style={{maxHeight:250, maxWidth:350}}/>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">{props.title}</Typography>
        <Typography variant="body2" color="text.secondary">{props.description}</Typography>
        <Typography variant='h8'color="inherit">{props.price}</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={expand} variant="contained">select</Button>
      </CardActions>
      
    </Card>
  );
}

export default Courses;