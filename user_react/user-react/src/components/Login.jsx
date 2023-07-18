import React from "react";
import axios from "axios"
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Typography } from "@mui/material";

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
        
            return (
            <div>
              <Card style={{flexDirection: "column",marginTop:200, marginLeft:500, height:500, width:1000}} variant="outlined">
                  <Typography fontFamily={'"Times New Roman", Times, serif'} color="#007FFF" variant="h3" style={{paddingTop:"10px", paddingLeft:"420px"}}>Login</Typography>
                  <div style={{paddingLeft:"100px"}}>
                  <div style={{paddingTop:'90px'}}><TextField style={{width:350, paddingRight:20}} id="outlined-basic" variant="outlined" onChange={(e)=>setUsername(e.target.value)} type="text" placeholder="username" /></div>
                  <div style={{paddingTop:'30px'}}><TextField style={{width:350}} id="outlined-basic" variant="outlined" onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="password" /></div>
                  <div style={{paddingTop:'10px'}}><Button onClick={()=>{login()}} variant="contained">Login</Button></div>
                  <br/>
                  <p>Not registered <a href="/signup">Signup</a></p>
                </div>
              </Card>
         </div>)
}
export default Login;