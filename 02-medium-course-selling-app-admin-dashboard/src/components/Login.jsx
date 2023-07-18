import React from "react";
import axios from "axios";

/// File is incomplete. You need to add input boxes to take input for users to login.
function Login() {
    const register = () => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        axios.post(import.meta.env.VITE_URL_KEYR+"/admin/login", {
            data: {username, password}
        }).then((response) => {
            const token = response.data.authorization;
            localStorage.setItem("token", token);
            console.log(token);
            console.log(response.status);
        })}

    return <div>
        <h1>Login to admin dashboard</h1>
        <br/>
        <input type={"text"} id="username" placeholder="username" />
        <input type={"text"} id="password" placeholder="password" />
        <button onClick={register}>Login</button>
        <br/>
        New here? <a href="/register">Register</a>
    </div>
}

export default Login;