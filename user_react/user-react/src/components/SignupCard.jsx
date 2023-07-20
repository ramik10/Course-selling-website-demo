import React from "react";
import axios from "axios"
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Box, CardContent, Grid, Typography } from "@mui/material";
import {
  useRecoilValue,
  useSetRecoilState
} from 'recoil';
import { usernameState } from "../atoms/username";
import { passwordState } from "../atoms/password";


function UsernameBox(){
    const setUsername = useSetRecoilState(usernameState);
    return(
      <TextField sx={{paddingTop:"12%",height:"20%", width:"45%"}} id="username" variant="outlined" onChange={(e)=>setUsername(e.target.value)} type="text" placeholder="username" />
    );
  }
  
function PasswordBox(){
     const setPassword = useSetRecoilState(passwordState);
    return(
      <TextField sx={{paddingTop:{lg:"1%",md:"1%",sm:"5%", xs:"6%"}, height:"20%", width:"45%"}} id="password" variant="outlined" onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="password" />
    );
  }

function SignupButton(props){
    const username = useRecoilValue(usernameState);
    const password = useRecoilValue(passwordState);
    const navigate = useNavigate();
    function register(){
      // const username = document.getElementById("username").value;
      // const password = document.getElementById("password").value;
      
     
      if((username!=="")&&(password!=="")){
      axios.post(import.meta.env.VITE_URL_KEYR+"/users/"+props.ButtonName.toLowerCase(),
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
    return(
      <Button onClick={()=>{register()}} variant="contained">{props.ButtonName}</Button>
    )
  }
  
  
function SignupCard(props){
  
      return (
        <Grid item xs={11} sm={8} md={6} lg={6} xl={6} sx={{ height:{lg:"60vh",md:"52vh", sm:"25vh", xs:"70vh"}, width:"100vw", paddingTop:{lg:"10vh", md:"30vh", sm:"25vh", xs:"25vh"}, display:"flex", justifyContent:"center"}}> 
        <Card sx={{height:"100%", width:{lg:"40%",md:"40%", sm:"60%", xs:"70%"}}} variant="outlined">
          <CardContent sx={{height:"100%", width:"100%"}}>
            <Typography fontFamily={'"Times New Roman", Times, serif'} color="#007FFF" variant="h3" sx={{fontSize: { lg: 50, md: 40, sm: 25, xs: 20 },display:"flex", justifyContent:"center"}}>{props.ButtonName}</Typography>
             <UsernameBox/>
             <br/>
             <PasswordBox/>
             <br/>
             <Box sx={{paddingTop:{lg:"1%",md:"1%",sm:"5%", xs:"6%"},paddingBottom:{sm:"3%", xs:"5%"}, height:"6%", width:"auto"}}>
              <SignupButton ButtonName={props.ButtonName}/>
             </Box>
            
             <p>{props.Message+" "}<a href={"/" + props.Redirect}>{props.Redirect}</a></p>
          </CardContent>
        </Card>
        </Grid> );
}
export default SignupCard;