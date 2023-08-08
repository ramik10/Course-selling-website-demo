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
          .get(import.meta.env.VITE_URL_KEYR+"/users/courses/"+courseId, {headers:{"authorization": "Bearer "+localStorage.getItem("token")}})
          .then((res) => {
            // console.log(res.data);
            setCourse(res.data);
          });
      }, [courseId]);
    
    
    
    return(
        <Grid item xs={10} sm={8} md={6} lg={4} xl={6} sx={{paddingTop:10,rowGap:2, columnGap:2, display:"flex", justifyContent:"center"}}>
          <Card raised sx={{borderRadius:"50px",height:"auto",width:{xs:"100%",lg:"50%"}}}>
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
    axios.post(import.meta.env.VITE_URL_KEYR+"/users/courses/"+courseId,null, {headers:{"authorization": "Bearer "+localStorage.getItem("token")}}).then((response)=>{
        alert(response.data.message);
    })}
  return (
    <><Grid sx={{ height:{xs:"55%", lg:"65%"}, display: "flex", justifyContent: "center"}}>
      <CardMedia
        component="img"
        image={course.imageLink}
        sx={{ height: "100%" }} />
    </Grid><CardContent sx={{ height: {xs:"20%",lg:"20%"}, width: "auto" }}>
        <Typography gutterBottom variant="h5" component="div">{course.title}</Typography>
        <Typography variant="body2" color="text.secondary">{course.description}</Typography>
        <Typography variant='h8' color="inherit">{"price: "+course.price}</Typography>
      </CardContent><CardActions sx={{ width: "auto", height: "10%" }}>
        <Button sx={{marginLeft:{lg:"42%", xs:"33%"}, borderRadius:"16px"}} onClick={purchase} variant="contained">purchase</Button>
      </CardActions></>
  )
}
export default Purchase;