import React from "react";
import axios from "axios"
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Typography } from "@mui/material";
import { Box, CardContent, Grid } from "@mui/material";

function Login(){
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();
    const login = ()=>{
            // const username = document.getElementById("username").value;
            // const password = document.getElementById("password").value;
            if((username!=="")&&(password!=="")){
            axios.post(import.meta.env.VITE_URL_KEYR+"/users/login",
               { username, password}
            ).then((res)=>{
              const token = res.data.authorization;
              const username = res.data.username;
              localStorage.setItem("token", token)
              localStorage.setItem("username", username)
              console.log(res.status)
              console.log(res.data.message)
              navigate("/courses")
            }).catch((error) => {
                console.error(error);
              });}}
        
            return ( <Grid item xs={10} sm={8} md={6} lg={6} xl={6} sx={{ height:{lg:"60vh",md:"52vh", sm:"25vh", xs:"20vh"}, width:"100vw", paddingTop:{lg:"10vh", md:"30vh", sm:"25vh"}, display:"flex", justifyContent:"center"}}> 
            <Card sx={{height:"100%", width:"40%"}} variant="outlined">
              <CardContent sx={{height:"100%", width:"100%"}}>
                <Typography fontFamily={'"Times New Roman", Times, serif'} color="#007FFF" variant="h3" sx={{fontSize: { lg: 50, md: 40, sm: 25, xs: 10 },display:"flex", justifyContent:"center"}}>Login</Typography>
                 <TextField sx={{paddingTop:"12%",height:"20%", width:"45%"}} id="username" variant="outlined" onChange={(e)=>setUsername(e.target.value)} type="text" placeholder="username" />
                 <br/>
                 <TextField sx={{paddingTop:"1%", height:"20%", width:"45%"}} id="password" variant="outlined" onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="password" />
                 <br/>
                 <Box sx={{paddingTop:"1%", height:"6%", width:"auto"}}>
                 <Button onClick={()=>{login()}} variant="contained">Login</Button>
                 </Box>
                
                 <p>Have not registered yet <a href="/signup">register</a></p>
              </CardContent>
            </Card>
            </Grid>);
}
export default Login;