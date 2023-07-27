import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Card, Typography } from "@mui/material";

function ContentElement(){
    const { courseId, contentId } = useParams();
    const [ContentElement, setContentElement] = React.useState({});
        axios.get(import.meta.env.VITE_URL_KEYR+"/users/purchasedCourses/"+courseId+"/"+contentId,{withCredentials:true}).then((response) => {
            setContentElement(response.data.content);
        })
    return (
       <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h2" color={{xs:"#2a9df4",lg:"Black"}} sx={{fontSize:{lg:"400%", xs:"300%"},paddingTop:{lg:"3%", xs:"10%"}, textDecoration:"underline", paddingBottom:"1%"}}>{ContentElement.title}</Typography>
            <video width="75%" src={ContentElement.videoLink} controls></video>
            <Box sx={{width:{lg:"70%", xs:"95%"}, paddingTop:{lg:"1%", xs:"5%"}, display:"flex", flexDirection:"column"}}>
            <Card sx={{display:"flex",paddingLeft:"1%", paddingBottom:"2%",paddingTop:"2%", width:"100%", bgcolor:"#242424", borderBottom:"1px solid black", borderRadius:"16px"}}>
                <Typography color="#e5b000" sx={{paddingLeft:{lg:"1%", xs:"5%"}}}>{ContentElement.description}</Typography>
            </Card>
            </Box>
        </Box>
    )
}
export default ContentElement;