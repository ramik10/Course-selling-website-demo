import React from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Grid, Typography } from '@mui/material';

function PurchasedCourses(){
    const[purchasedCourses, setpurchasedCourses]=React.useState([]);
    React.useEffect(()=>{
        axios.get(import.meta.env.VITE_URL_KEYR+"/users/purchasedCourses",{
            headers:{"authorization":"Bearer "+ localStorage.getItem("token")}
        }).then((res)=>{
            // console.log(res.data)
            setpurchasedCourses(res.data.purchasedCourses);
        })
    },[]);
    return(
     <div>
        <h1 style={{display:"flex", justifyContent:"center"}}>Your Purchased Courses</h1>
        <Grid container spacing={2} style={{justifyContent:"center"}}>
            { purchasedCourses.map((c)=> <Course key ={c._id} title={c.title} description={c.description} imageLink={c.imageLink}/>)}
        </Grid> 
     </div> 
    )}
    function Course(props){
        return(
        <div style={{height:500, width:350, margin:'5px'}}>
            <Card style={{marginTop:5, marginLeft:5}}>
                <img src={props.imageLink} style={{maxWidth:350}}/>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">{props.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{props.description}</Typography>
                </CardContent>
            </Card>
        </div>
        )
    }
export default PurchasedCourses;