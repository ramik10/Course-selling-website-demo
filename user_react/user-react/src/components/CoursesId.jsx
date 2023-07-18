import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, CardActions, Typography } from '@mui/material';


function Purchase(){
    const {courseId} = useParams();
    const[course, setcourse] = React.useState({});
    React.useEffect(() => {
        axios
          .get(import.meta.env.VITE_URL_KEYR+"/users/courses/"+courseId, {
            headers: {
              authorization: "Bearer "+localStorage.getItem("token"),
            },
          })
          .then((res) => {
            // console.log(res.data);
            setcourse(res.data);
          });
      }, [courseId]);
    
    
    const purchase=()=>{
        // console.log(localStorage.getItem("token"))
        axios.post(import.meta.env.VITE_URL_KEYR+"/users/courses/"+courseId,null,{
            headers: {
                "authorization": "Bearer " + localStorage.getItem("token")
              }
        }).then((response)=>{
            alert(response.data.message);
        })
    }
    return(
        <div style={{display:"flex", justifyContent:"center"}}>
          <Card style={{marginTop:5, marginLeft:5}}>
            <img src={course.imageLink} style={{maxWidth:900}}/>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">{course.title}</Typography>
              <Typography variant="body2" color="text.secondary">{course.description}</Typography>
              <Typography variant='h8'color="inherit">{course.price}</Typography>
            </CardContent>
            <CardActions>
              <Button onClick={purchase} variant="contained">purchase</Button>
            </CardActions>
          </Card>
        </div>
    )
        }
export default Purchase;