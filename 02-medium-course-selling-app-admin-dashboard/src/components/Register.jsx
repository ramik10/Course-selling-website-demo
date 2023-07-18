import React from "react";
import axios from "axios";
/// File is incomplete. You need to add input boxes to take input for users to register.
function Register() {
    const register = () => {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        axios.post(import.meta.env.VITE_URL_KEYR+"/admin/signup", {
            data: {email, password}
        }).then((response) => {
            const token = response.data.authorization;
            localStorage.setItem("token", token);
            console.log(response.status);
        })
    }
    

    return <div>
        <h1>Register to the website</h1>
        <br/>
        <input type="text" placeholder="Enter your email" id="email"/>
        <input type="password" placeholder="Enter your password" id="password"/>
        <button onClick={register}>Register</button>
        <br/>
        Already a user? <a href="/login">Login</a>
    </div>
}

export default Register;