import React from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, CardActions, Grid, Typography} from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
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
      <div style={{paddingTop:"5vh"}}>
        <Typography color={{lg:"#242424", xs:"#e5b000"}} variant="h3" component="div" sx={{paddingBottom:{lg:4, xs:3}, display:"flex", justifyContent:"center", fontSize:{lg:"300%", xs:"150%"}}}>Course Page</Typography>
        <Grid container spacing={2} sx={{ display:"flex", justifyContent:"center"}}>
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
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
    <Card>
      <div style={{height:250, width:"auto", display:"flex", justifyContent:"center"}}>
      <CardMedia
        sx={{height:"100%",width:350}}
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
        <Button onClick={expand} variant="contained">select</Button>
      </CardActions>
      
    </Card>
    </Grid>
  );
}

export default Courses;