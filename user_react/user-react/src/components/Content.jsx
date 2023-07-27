import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Button, Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
function Content(){
    const {courseId} = useParams();
    const [content, setContent] = React.useState([]);
    React.useEffect(() => {
        axios.get(import.meta.env.VITE_URL_KEYR+"/users/purchasedCourses/"+courseId,{withCredentials:true}).then((response) => {
            setContent(response.data.course.content);
        })
    }, []);
    return (
        <div>
            <Typography variant="h2" color={{xs:"#2a9df4",lg:"Black"}} sx={{paddingTop:{lg:"2%",xs:"10%"},display:"flex", justifyContent:"center", fontSize:{lg:"400%",xs:"250%"}}} >Content Page</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',width:"100%" }}>
                {content.map((c) => <ContentCard key={c._id} id={c._id} title={c.title} description={c.description} />)}
            </Box>
        </div>

    )
}
function ContentCard(props) {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const contentId = props.id;
    return (
        <Card sx={{display:"flex", paddingBottom:"2%",paddingTop:"2%", width:"100%", bgcolor:"#242424", borderBottom:"1px solid black", borderRadius:"16px"}}>
            <h1 style={{color:"#e5b000", paddingLeft:"5%"}}>{props.title}</h1>
            <Box sx={{display:"flex", flexDirection:"column", width:{lg:"20%", xs:"40%"}}}>
            <p style={{paddingLeft:"10%", color:"white"}}>{props.description}</p>
            <Button sx={{width:"20%", borderRadius:"45%", marginLeft:"30%", marginTop:"10%"}} variant="contained"  onClick={()=>{navigate("/courses/purchased/"+courseId+"/content/"+contentId)}}>open</Button>
            </Box>
        </Card>
    );
}
export default Content;