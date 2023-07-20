import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


export default function Navbar() {
    const navigate = useNavigate();
    function logout(){
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        window.location.href = "/login"
    }
    function mycourses(){
        navigate("/courses/purchased")
    }
    function courses(){
        navigate("/courses")
    }
  if (localStorage.getItem("token")) {
    return (
    <Box sx={{ flexGrow: 1, width:"100vw", position:"fixed", top:0}}>
      <AppBar color="transparent" position="static" sx={{width:"100%"}}>
        <Toolbar sx={{justifyContent:'flex-start', width:"auto"}}>
          <Typography color="#2196f3" variant="h5" component="div" sx={{ flexGrow: 1 }}>
            COURSERA
          </Typography>
          <div style={{display: 'flex', justifyContent:"flex-end"}}>
            <Typography color="#2196f3" style={{paddingTop:2}} variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {localStorage.getItem("username")}
            </Typography>
            <Button sx={{padding:"0px",paddingLeft:"10px", color:"#2196f3"}}onClick={courses} >Courses</Button>
            <Button sx={{color:"#2196f3"}}onClick={mycourses} >MyCourses</Button>
            <Button sx={{color:"#2196f3"}}onClick={logout} >Logout</Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );}
  else{
    return (
      <Box sx={{ flexGrow: 1 }}>
      <AppBar color="transparent" position="static">
        <Toolbar>
          <Typography color="#2196f3" variant="h5" component="div" sx={{ flexGrow: 1 }}>
            COURSERA
          </Typography>
          <Button style={{color:"#2196f3"}}onClick={()=>{navigate("/login")}}>Login</Button>
          <Button style={{color:"#2196f3"}}onClick={()=>{navigate("/signup")}}>Signup</Button>
        </Toolbar>
      </AppBar>
    </Box>
    )
  }
}
