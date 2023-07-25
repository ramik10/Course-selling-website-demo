import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { isLoadingState, userPresentState } from '../atoms/userPresentState';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import axios from 'axios';
                                                                                                                                                          
const drawerWidth = 240;

export default function Navbar() {
  const navigate = useNavigate();
  
    return (
    
        <><AppBar  position="fixed" sx={{bgcolor:"#242424", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ justifyContent: 'flex-start', width: "auto" }}>
          <Typography color="#2196f3" variant="h5" component="div" sx={{ display: { xs: "none", lg: "block" }, flexGrow: 1 }}>
            COURSERA
          </Typography>
          <TokenDepend />
        </Toolbar>
      </AppBar><Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', lg: 'block' },
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <List>
                <ListItem key={"Home"} disablePadding>
                  <ListItemButton onClick={()=>{navigate("/")}}>
                    <ListItemIcon>
                      <HomeIcon /> 
                    </ListItemIcon>
                    <ListItemText primary={"Home"} />
                  </ListItemButton>
                </ListItem>
                <ListItem key={"Courses"} disablePadding>
                  <ListItemButton onClick={()=>{navigate("/courses")}}>
                    <ListItemIcon>
                      <SchoolIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Courses"} />
                  </ListItemButton>
                </ListItem>
                <ListItem key={"Mycourses"} disablePadding>
                  <ListItemButton onClick={()=>{navigate("/courses/purchased")}}>
                    <ListItemIcon>
                      <SchoolIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Mycourses"} />
                  </ListItemButton>
                </ListItem>
                <Logout />
            </List>
          </Box>
        </Drawer></>

  );}
function Logout(){
  const isLoading = useRecoilValue(isLoadingState);
  const setUser = useSetRecoilState(userPresentState);
  const setIsLoading = useSetRecoilState(isLoadingState);
  if (!isLoading) {
    return (
      <ListItem key={"Logout"} disablePadding>
                  <ListItemButton onClick={()=>{
                        axios.get(import.meta.env.VITE_URL_KEYR+"/users/logout",{withCredentials:true}).then((res)=>{
                        console.log(res.data.message)
                        setUser(null)
                        setIsLoading(true)
                        window.location.href="/"})}}>
                    <ListItemIcon>
                      <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Logout"} />
                  </ListItemButton>
                </ListItem>
    )}
}
 

function LoggedOut(){
  const navigate = useNavigate();
  return(   
       <><Button style={{ color: "#2196f3" }} onClick={()=>{navigate("/login")}}>Login</Button>
       <Button style={{ color: "#2196f3" }} onClick={()=>{navigate("/signup")}}>Signup</Button></>
  )
}

function LogoutButton(){
  const setUser = useSetRecoilState(userPresentState);
  const setIsLoading = useSetRecoilState(isLoadingState);
  function logout(){
      axios.get(import.meta.env.VITE_URL_KEYR+"/users/logout",{withCredentials:true}).then((res)=>{
      console.log(res.data.message)
      setUser(null)
      setIsLoading(true)
      window.location.href="/"})};
  return(
    <Button sx={{paddingLeft:{lg:"10px", xs:"1px"},color:"#e5b000"}}onClick={logout}>Logout</Button>
  )
}
function MycoursesButton(){
  const navigate = useNavigate();
  return(<Button sx={{paddingLeft:{lg:"10px", xs:"1px"},color:"#e5b000"}} onClick={()=>{navigate("/courses/purchased")}}>MyCourses</Button>)
}
function CoursesButton(){
  const navigate = useNavigate();
  return(<Button sx={{paddingLeft:{lg:"10px", xs:"1px"},color:"#e5b000"}} onClick={()=>{navigate("/courses")}}>Courses</Button>)
}
function TokenDepend(){
  const setUser = useSetRecoilState(userPresentState);
  const setIsLoading = useSetRecoilState(isLoadingState);
  axios.get(import.meta.env.VITE_URL_KEYR+"/users/me",{withCredentials:true}).then((res)=>{
    const username = res.data.username;
    setUser(username);
    setIsLoading(false);})
  const isLoading = useRecoilValue(isLoadingState);
  if (!isLoading) {
    return (
      <LoggedIn />
    )}
  else{
      return(
        <LoggedOut/>
      )
    }
  }

function LoggedIn(){
  const username = useRecoilValue(userPresentState);
  return(
    <div style={{display: 'flex', justifyContent:"flex-end"}}>
            {username && <Typography xs="auto" color="#2196f3" variant="h3" component="div" sx={{fontSize:{lg:"140%", xs:"100%"}, flexGrow: 1,paddingTop:{lg:"1.5%", xs:"3%"}, paddingLeft:{lg:"10px", xs:"5px"}, paddingRight:{lg:"30px", xs:"0px"} }}>
              {username}
            </Typography>
            }
            <Box sx={{paddingLeft:2, display:{lg:"none", xs:"block"}}} >
            <CoursesButton />
            <MycoursesButton />
            <LogoutButton />
            </Box>
     </div>
  )
}
