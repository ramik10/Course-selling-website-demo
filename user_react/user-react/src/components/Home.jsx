import React from "react";
import {Typography } from "@mui/material";

function Home(){
    return(
    <div style={{ display: "flex", justifyContent: "center", paddingTop: "5vh" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "50%",  borderRadius: "10px", padding: "20px" }}>
            <Typography variant="h2" sx={{color:{lg:"black", xs:"#e5b000"}}}>Homepage</Typography>
            <br />
            <Typography variant="h6" sx={{color:{lg:"black", xs:"#e5b000"}}}>Click on the Login tab to login</Typography>
            <br />
            <Typography variant="h6" sx={{color:{lg:"black", xs:"#e5b000"}}}>Click on the Signup tab to signup</Typography>
            <br />
            <Typography variant="h6" sx={{color:{lg:"black", xs:"#e5b000"}}}>After login click on the Courses tab to view the courses</Typography>
        </div>
        </div>
    )
}
export default Home;