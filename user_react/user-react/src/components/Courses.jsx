import React from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, CardActions, Grid, Typography} from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { coursesState } from '../atoms/courses';


function Courses() {
  const setCourses = useSetRecoilState(coursesState);

  React.useEffect(() => {
    axios.get(import.meta.env.VITE_URL_KEYR+"/users/courses",{withCredentials: true})
      .then(res => {
        // console.log(res.data)
        setCourses(res.data);
      })
      .catch(err => {
        console.error("Error fetching courses:", err);
      });
  }, []);
  return(
      <div style={{paddingTop:"5vh"}}>
        <Typography color={{lg:"#242424", xs:"#e5b000"}} variant="h3" component="div" sx={{paddingBottom:{lg:4, xs:3}, display:"flex", justifyContent:"center", fontSize:{lg:"300%", xs:"150%"}}}>Course Page</Typography>
        <Grid_new/>
      </div>
  );
}
function Grid_new(){
  const courses = useRecoilValue(coursesState);
  return(
    <Grid container spacing={2} sx={{ display:"flex", justifyContent:"center"}}>
        {courses.map((c) =>
          <Course key={c._id} id={c._id} title={c.title} description={c.description} price={c.price} imageLink={c.imageLink} published={c.published} />)}
        </Grid>
  )
}
function Course(props) {
  const navigate = useNavigate();
  const expand = () => {
    navigate("/courses/" + props.id);
  }
  return (
    <Grid item xs={12} sm={6} md={5} lg={3}>
    <Card sx={{borderRadius:"50px", height:"45vh"}}>
      <div style={{height:"60%", width:"100%", display:"flex", justifycontent:"center"}}>
      <CardMedia
        sx={{height:"100%",width:"100%"}}
        image={props.imageLink}
        title="green iguana"
      />
      </div>
      <CardContent>
        <Typography  gutterBottom variant="h5" component="div">{props.title}</Typography>
        <Typography variant="body2" color="text.secondary">{props.description}</Typography>
        <Typography variant='h8'color="inherit">{props.price}</Typography>
      </CardContent>
      <CardActions>
        <Button sx={{marginLeft:"38%", borderRadius:"16px"}} onClick={expand} variant="contained">select</Button>
      </CardActions>
      
    </Card>
    </Grid>
  );
}

export default Courses;