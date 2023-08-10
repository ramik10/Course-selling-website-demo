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
import SignupCard from "./SignupCard";
import Dialog from "@mui/material/Dialog";
import { useRecoilState } from 'recoil';
import { onCloseLogin,onCloseSignup } from '../atoms/onCloseButton';
                                                                                                                                                          
const drawerWidth = 240;

export default function Navbar() {
  const navigate = useNavigate();
  
    return (
    
        <><AppBar  position="fixed" sx={{bgcolor:"#242424", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ justifyContent: 'flex-start', width: "auto" }}>
            <Box component="img" src="/My project-1.png" sx={{paddingRight:"88vw", display: { xs: 'none', lg: 'block' }, width:"50px", padding:"none"}}></Box>
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
                        localStorage.removeItem("token")
                        setUser(null)
                        setIsLoading(true)
                        window.location.href="/"}}>
                    <ListItemIcon>
                      <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Logout"} />
                  </ListItemButton>
                </ListItem>
    )}
}
 

function LoggedOut(){
  const [open, setOpen] = useRecoilState(onCloseLogin);
  const [open2, setOpen2] = useRecoilState(onCloseSignup);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  return(   
       <><Button style={{ color: "#2196f3" }} onClick={handleClickOpen}>Login</Button>
       <Button style={{ color: "#2196f3" }} onClick={handleClickOpen2}>Signup</Button>
       <Dialog PaperProps={{ sx: { borderRadius: "35px" } }} maxWidth="sm" fullWidth="true" onClose={handleClose} open={open}>
       <SignupCard ButtonName="Login" Redirect="signup" Message="Have not registered yet"/>
       </Dialog>
       <Dialog PaperProps={{ sx: { borderRadius: "35px" } }} maxWidth="sm" fullWidth onClose={handleClose2} open={open2}>
       <SignupCard ButtonName="Signup" Redirect="login" Message="Already registered"/>
       </Dialog>
       </>
  )
}

function LogoutButton(){
  const setUser = useSetRecoilState(userPresentState);
  const setIsLoading = useSetRecoilState(isLoadingState);
  function logout(){
      localStorage.removeItem("token")
      setUser(null)
      setIsLoading(true)
      window.location.href="/"};
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
  axios.get(import.meta.env.VITE_URL_KEYR+"/users/me",{headers:{"authorization": "Bearer "+localStorage.getItem("token")}}).then((res)=>{
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
