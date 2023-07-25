import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, CardActions, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'
import CardMedia from '@mui/material/CardMedia';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { courseState } from '../atoms/course';


function Purchase(){
    const {courseId} = useParams();
    const setCourse = useSetRecoilState(courseState);
    React.useEffect(() => {
        axios
          .get(import.meta.env.VITE_URL_KEYR+"/users/courses/"+courseId, {
            withCredentials: true,
          })
          .then((res) => {
            // console.log(res.data);
            setCourse(res.data);
          });
      }, [courseId]);
    
    
    
    return(
        <Grid item xs={10} sm={8} md={6} lg={6} xl={6} sx={{height:"72%", paddingTop:10,rowGap:2, columnGap:2, display:"flex", justifyContent:"center"}}>
          <Card raised sx={{height:"70vh", width:"auto"}}>
            <CardUI/>
          </Card>
        </Grid>
    )
}
function CardUI() {
  const {courseId} = useParams();
  const course = useRecoilValue(courseState);
  const purchase=()=>{
    // console.log(localStorage.getItem("token"))
    axios.post(import.meta.env.VITE_URL_KEYR+"/users/courses/"+courseId,null,{
        withCredentials: true,
    }).then((response)=>{
        alert(response.data.message);
    })}
  return (
    <><Grid sx={{ height: "70%", width: "auto", display: "flex", justifyContent: "center"}}>
      <CardMedia
        component="img"
        image={course.imageLink}
        sx={{ height: "100%", width: "auto" }} />
    </Grid><CardContent sx={{ height: "15%", width: "auto" }}>
        <Typography gutterBottom variant="h5" component="div">{course.title}</Typography>
        <Typography variant="body2" color="text.secondary">{course.description}</Typography>
        <Typography variant='h8' color="inherit">{course.price}</Typography>
      </CardContent><CardActions sx={{ width: "20%", height: "auto" }}>
        <Button onClick={purchase} variant="contained">purchase</Button>
      </CardActions></>
  )
}
export default Purchase;