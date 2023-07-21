import React from "react";

function Home(){
    return(
    <div style={{ display: "flex", justifyContent: "center", paddingTop: "5vh" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "50%",  borderRadius: "10px", padding: "20px" }}>
            <h1>Homepage</h1>
            <p>Click on the Courses tab to view the courses</p>
            <br />
            <p>Click on the Login tab to login</p>
            <br />
            <p>Click on the Signup tab to signup</p>
        </div>
        </div>
    )
}
export default Home;