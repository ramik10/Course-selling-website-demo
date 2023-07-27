import React from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, CardActions, Grid, Typography} from '@mui/material';
import CardMedia from '@mui/material/CardMedia'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { purchasedState } from '../atoms/purchased';
import { useNavigate } from 'react-router-dom';
import Content from './Content';

function PurchasedCourses(){
    const setpurchasedCourses=useSetRecoilState(purchasedState);
    React.useEffect(()=>{
        axios.get(import.meta.env.VITE_URL_KEYR+"/users/purchasedCourses",{
            withCredentials: true
        }).then((res)=>{
            // console.log(res.data)
            setpurchasedCourses(res.data.purchasedCourses);
        })
    },[]);
    return(
        <div style={{paddingTop:"5vh"}}>
        <Typography color={{lg:"#242424", xs:"#e5b000"}} variant="h3" component="div" sx={{paddingBottom:{lg:5, xs:3}, display:"flex", justifyContent:"center", fontSize:{lg:"300%", xs:"150%"}}}>Your purchased Courses</Typography>
         <Grid_new/>
     </div> 
    )}

    function Grid_new(){
        const purchasedCourses = useRecoilValue(purchasedState);
        return(
            <Grid container spacing={2} style={{justifyContent:"center"}}>
            { purchasedCourses.map((c)=> <Course key ={c._id} id={c._id} title={c.title} description={c.description} imageLink={c.imageLink}/>)}
        </Grid>
        )
    }
    function Course(props){
        return(
            <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{borderRadius:"50px", height:"42vh"}}>
              <div style={{height:"60%", width:"100%", display:"flex", justifycontent:"center"}}>
              <CardMedia
                sx={{height:"100%",width:"100%"}}
                image={props.imageLink}
              />
              </div>
              <CardContent>
                <Typography  gutterBottom variant="h5" component="div">{props.title}</Typography>
                <Typography variant="body2" color="text.secondary">{props.description}</Typography>
              </CardContent>
              <CardActions>
                <DetailsButton newid={props.id}/>
              </CardActions>
              
            </Card>
            </Grid>
        )
    }
    function DetailsButton(preps){
        const navigate = useNavigate(); 
        const courseId=preps.newid;
        return(
        <Button sx={{marginLeft:"27%", borderRadius:"16px"}} variant="contained" onClick={()=>{navigate("/courses/purchased/"+courseId+"/content")}}>Course details</Button>
        )
    }
export default PurchasedCourses;