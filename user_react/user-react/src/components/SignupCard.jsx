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

import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { onCloseLogin, onCloseSignup } from "../atoms/onCloseButton";
import Link from '@mui/material/Link'


function UsernameBox(){
    const setUsername = useSetRecoilState(usernameState);
    return(
      <TextField InputProps={{
        style: {
          borderRadius: "40px",
        }
      }} sx={{paddingLeft:"4%", paddingTop:"8%",height:"20%", width:"90%"}} id="username" variant="outlined" onChange={(e)=>setUsername(e.target.value)} type="text" placeholder="username" />
    );
  }
  
function PasswordBox(){
     const setPassword = useSetRecoilState(passwordState);
    return(
      <TextField InputProps={{
        style: {
          borderRadius: "40px",
        }
      }} sx={{paddingLeft:"4%", paddingTop:{lg:"2%",md:"1%",sm:"5%", xs:"6%"}, height:"20%", width:"90%"}} id="password" variant="outlined" onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="password" />
    );
  }

function SignupButton(props){
    const username = useRecoilValue(usernameState);
    const password = useRecoilValue(passwordState);
    const setIsLoading = useSetRecoilState(passwordState);
    // const tokenPresent = useSetRecoilState(tokenPresentState);
    const navigate = useNavigate();
    function register(){
      // const username = document.getElementById("username").value;
      // const password = document.getElementById("password").value;
      
     
      if((username!=="")&&(password!=="")){
      axios.post(import.meta.env.VITE_URL_KEYR+"/users/"+props.ButtonName.toLowerCase(),
         { username, password},{withCredentials:true}
      ).then((res)=>{
          const token = res.data.authorization;
          localStorage.setItem("token", token)
          setIsLoading(false)
          // tokenPresent(true)
          console.log(res.status)
          console.log(res.data.message)
          navigate("/courses")
      }).catch((error) => {
          console.error(error);
        });}}
    return(
      <Button sx={{borderRadius:"16px"}} onClick={()=>{register()}} variant="contained">{props.ButtonName}</Button>
    )
  }
  
  
function SignupCard(props){
    const close1 = useSetRecoilState(onCloseSignup);
    const close2 = useSetRecoilState(onCloseLogin);
      function onClose(){
        close1(false);
        close2(false);
      };
      return (
        <Grid  item xs={12} sm={12} md={12} lg={12} xl={12} sx={{borderRadius:"50px", height:"100%", width:"100%", display:"flex", justifyContent:"center"}}> 
        <Card sx={{height:"100%", width:"100%"}} variant="outlined">
          <CardContent sx={{padding:"0%",height:"100%", width:"100%", display:"flex",flexDirection:"column", justifyContent:"center"}}>
          <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: "#007FFF"
          }}
        >
          <CloseIcon />
        </IconButton>
            <Typography fontFamily={'"Times New Roman", Times, serif'} color="#007FFF" variant="h3" sx={{paddingTop:"2%",fontSize: { lg: 50, md: 40, sm: 25, xs: 35 },display:"flex", justifyContent:"center"}}>{props.ButtonName}</Typography>
             <UsernameBox/>
             <br/>
             <PasswordBox/>
             <br/>
             <Box sx={{paddingTop:{lg:"2%",md:"1%",sm:"5%", xs:"3%"},paddingBottom:{sm:"3%", xs:"5%"}, height:"6%", width:"100%", display:"flex",justifyContent:"center"}}>
              <SignupButton ButtonName={props.ButtonName}/>
              
             </Box>
             <Box sx={{display:"flex",justifyContent:"center"}}>
             <p>{props.Message+" "}<Link onClick={()=>{
              if(props.Redirect==="signup"){
                close2(false);
                close1(true);
              }
              if(props.Redirect==="login"){
                close1(false);
                close2(true);
              }
             }}>{props.Redirect}</Link></p>
             </Box>
            
             
          </CardContent>
        </Card>
        </Grid> );
}
export default SignupCard;